#!/usr/bin/env node
import readline from 'readline';
import renderToConsole from '../src/renderers/consoleRenderer.js';
import fhr from 'flathier';

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

// Add a selectedIndex variable to track the current selection
let selectedIndex = 0;
// Load the initial data
let data = await fhr.loadData();
// Create the initial tree
let tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);
// Render the initial tree to the console
console.log('\x1Bc'); // Clear the console and scroll buffer
// Display the initial tree
await renderToConsole(tree, selectedIndex);



// Updated keyMap with normalized keys
const keyMap = {
  up: (str, key) => {
    selectedIndex = Math.max(0, selectedIndex - 1); // Decrement index, ensuring it doesn't go below 0
    renderToConsole(tree, selectedIndex);
  },
  down: (str, key) => {
    // Increment index, ensuring it doesn't exceed the length of the tree
    selectedIndex = Math.min(tree.length - 2, selectedIndex + 1); // Minus two because the first line is the root node
    renderToConsole(tree, selectedIndex);
  },
  // Escape to exit
  escape: (str, key) => {
    console.log('Escape pressed, exiting...');
    process.exit(0);
  },
  // add more key handlers here
};

// Default handler if key not in keyMap
function defaultHandler(str, key) {
  console.log('Unmapped key pressed:', { str, name: key.name, sequence: key.sequence });
}

// 2) Listen for keypress events
process.stdin.on('keypress', (str, key) => {
  // Always exit on Ctrl+C
  if (key.ctrl && key.name === 'c') {
    console.log('Exiting...');
    process.exit(0);
  }

  // Lookup handler by normalized key
  const normalizedKey = normalizeKey(key);
  const handler = keyMap[normalizedKey] || defaultHandler;
  handler(str, key);
});
