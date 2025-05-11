import { createAsciiTree } from '../../src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import DataService from '../../src/services/DataService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Update the configPath to point to the configuration file in the package directory
const configPath = path.resolve(__dirname, '../../flat-hier.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const templateFilePath = path.resolve(process.cwd(), config.templateFileName);
const treeDataFilePath = path.resolve(process.cwd(), config.filepath);

// Lazy initialize DataService only when required
let dataService;

function getDataService() {
    if (!dataService) {
        dataService = new DataService();
    }
    return dataService;
}

let _lastRendered = {
  lines: [],         // array of strings (with trailing "\n")
  highlighted: null, // which index was inverted last time
  root: '',          // the rootNode line
  data: null,        // the current data
  selectedIndex: 0   // the current selected index
};

// Truncate a string to the current terminal width
function truncateToWidth(str) {
  const [cols] = process.stdout.getWindowSize();
  const hasNL = str.endsWith('\n');
  const body  = hasNL ? str.slice(0, -1) : str;
  return body.slice(0, cols) + (hasNL ? '\n' : '');
}

export async function renderToConsole(data, selectedIndex) {
  const ds = getDataService();
  await ds.loadData();
  _lastRendered.data = data;
  _lastRendered.selectedIndex = selectedIndex;

  const tree       = await createAsciiTree(data);
  const rootNode   = tree[0];
  const bodyLines  = tree.slice(1);
  selectedIndex    = Math.max(0, selectedIndex - 1);

  const { startIndex, endIndex } = calculateVisibleRange(bodyLines, selectedIndex);
  const visible   = bodyLines.slice(startIndex, endIndex);
  const toHighlight = selectedIndex - startIndex;

  // If root changed, rewrite it unconditionally:
  if (rootNode !== _lastRendered.root) {
    moveCursor(1, 1);
    process.stdout.write(truncateToWidth(rootNode));
    _lastRendered.root = rootNode;
  }

  // Diff each visible line against _lastRendered.lines
  visible.forEach((line, i) => {
    const oldLine = _lastRendered.lines[i] || '';
    const oldHl   = _lastRendered.highlighted;
    if (line !== oldLine || i === toHighlight || i === oldHl) {
      // move cursor to the correct row (row 2 + i, since row 1 is root)
      moveCursor(2 + i, 1);

      if (i === toHighlight)   invertWrite(line);
      else                     process.stdout.write(truncateToWidth(line));
    }
  });

  // If the height of the new visible slice is smaller, clear out old trailing lines
  if (_lastRendered.lines.length > visible.length) {
    const [width] = process.stdout.getWindowSize();
    for (let i = visible.length; i < _lastRendered.lines.length; i++) {
      moveCursor(2 + i, 1);
      process.stdout.write(' '.repeat(width));
    }
  }

  // Render shortcuts bar (you can diff it too, but it rarely changes size)
  renderShortcuts();

  // Save for next diff
  _lastRendered.lines       = visible;
  _lastRendered.highlighted = toHighlight;
}

function calculateVisibleRange(tree, selectedIndex) {
  const [, height] = process.stdout.getWindowSize();
  const startIndex = Math.max(0, selectedIndex - Math.floor(height / 2));
  const endIndex   = Math.min(tree.length, startIndex + height - 3);
  return { startIndex, endIndex };
}

function moveCursor(row, col = 1) {
  process.stdout.write(`\x1b[${row};${col}H`); // Move cursor
  process.stdout.write(`\x1b[2K`); // Clear the entire line
}

function invertWrite(line) {
  process.stdout.write(`\x1b[7m${truncateToWidth(line)}\x1b[0m`);
}

function renderShortcuts() {
  const shortcuts = "↑↓ Nav | ↵ Edit Title | Esc: Quit | ← → Promote/Demote | Shift + ↑↓ Move Item | r: Refresh";
  const [width, height] = process.stdout.getWindowSize();

  // Clear the second-to-last and last lines before rendering the shortcuts bar
  moveCursor(height - 1, 1);
  moveCursor(height, 1);

  // Render the shortcuts bar on the last line, truncated and padded
  const bar = shortcuts.slice(0, width).padEnd(width, ' ');
  process.stdout.write(`\x1b[7m${bar}\x1b[0m`);
}

export async function resetLastRendered() {
  _lastRendered = {
    lines: [],
    highlighted: null,
    root: '',
    data: null,
    selectedIndex: 0
  };
}

// Handle resize
process.on('SIGWINCH', async () => {
  console.clear();
  _lastRendered = {
    lines: [],
    highlighted: null,
    root: '',
    data: null,
    selectedIndex: 0
  };
  console.log('Resize detected. Resetting rendering state.');

  try {
    const ds = getDataService();
    await ds.loadData();
    const data = ds.getData();

    if (data) {
      renderToConsole(data, 0);
    } else {
      console.error('No data available to render.');
    }
  } catch (error) {
    console.error('Failed to reload data after resize:', error.message);
  }
});