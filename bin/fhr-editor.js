#!/usr/bin/env node
import readline from 'readline';

// Enable keypress events on stdin
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

console.log('Interactive CLI Key-Detection with Key Map Template');
console.log('Press any key to see details or trigger mapped actions. Ctrl+C to exit.');

// 1) Define a key-to-handler map for easy extension
const keyMap = {
  up:      (str, key) => console.log('Arrow Up pressed'),
  down:    (str, key) => console.log('Arrow Down pressed'),
  left:    (str, key) => console.log('Arrow Left pressed'),
  right:   (str, key) => console.log('Arrow Right pressed'),
  return:  (str, key) => console.log('Enter/Return pressed'),
  a:       (str, key) => console.log('Key "a" pressed'),
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

  // Lookup handler by normalized name or raw sequence
  const handler = keyMap[key.name] || keyMap[key.sequence] || defaultHandler;
  handler(str, key);
});
