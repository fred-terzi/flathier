#!/usr/bin/env node
import readline from 'readline';
import {renderToConsole, resetScreen} from '../src/renderers/consoleRenderer.js';
import fhr from 'flathier';

// Suppress built-in error messages and exit gracefully
process.on('uncaughtException', (err) => {
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  process.exit(1);
});

// Enable keypress events on stdin
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

// Normalize keys to avoid confusion between similar keys (e.g., 'n' and 'Ctrl+N')
function normalizeKey(key) {
  if (key.ctrl) {
    return `Ctrl+${key.name}`;
  }
  return key.name;
}

// Function to create a readline interface
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });
}

// Add a selectedIndex variable to track the current selection
let selectedIndex = 0;

// Load the initial data
let data = await fhr.loadData();

// Create the initial tree
let tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);

// Render the initial tree to the console
resetScreen();
await renderToConsole(tree, selectedIndex);

// Key handlers
const keyMap = {
  up: (str, key) => {
    selectedIndex = Math.max(0, selectedIndex - 1);
    renderToConsole(tree, selectedIndex);
  },
  down: (str, key) => {
    selectedIndex = Math.min(tree.length - 2, selectedIndex + 1);
    renderToConsole(tree, selectedIndex);
  },
  escape: (str, key) => {
    console.log('\x1Bc');
    console.log('Exiting...');
    process.exit(0);
  },
  'Ctrl+n': async () => {
    process.stdin.setRawMode(false);
    const rl = createReadlineInterface();

    try {
      const title = await new Promise((resolve) => {
        rl.question('Enter New Item Title: ', resolve);
      });

      if (!title.trim()) {
        console.log('⚠️ Title cannot be empty. Operation canceled.');
        return;
      }

      console.log(`Entered Title: ${title}`);

      const lastItemOutline = await fhr.getLastItemOutline(data);
      data = await fhr.addObject(data, lastItemOutline, title);
      // Get new last item outline
        const newLastItemOutline = await fhr.getLastItemOutline(data);
      // set the title of the new item
      const newItem = data.find((item) => item.outline === newLastItemOutline);
        newItem.title = title;
      await fhr.saveData(data);
      tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);
      resetScreen();
      // Increment selectedIndex to the new item
      selectedIndex = data.findIndex((item) => item.outline === newLastItemOutline) - 1;
      await renderToConsole(tree, selectedIndex);
    } catch (err) {
      console.error('❌ Error adding item:', err);
    } finally {
        rl.close();
        readline.emitKeypressEvents(process.stdin); // Re-enable keypress events
        process.stdin.setRawMode(true);             // Re-enable raw mode
        process.stdin.resume();                     // Keep stdin from closing
    }
      
  },
  delete: async (str, key) => {
    const outline = tree[selectedIndex + 1].outline;
    data = await fhr.deleteObject(data, outline);
    await fhr.saveData(data);
    tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);
    await renderToConsole(tree, selectedIndex);
  },
  // Add more key handlers here
};

// Listen for keypress events
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    console.log('Exiting...');
    process.exit(0);
  }

  const normalizedKey = normalizeKey(key);
  const handler = keyMap[normalizedKey];

  if (handler) {
    Promise.resolve(handler(str, key)).catch((err) => {
      console.error('❌ Handler error:', err);
      process.stdin.setRawMode(true);
    });
  }
});
