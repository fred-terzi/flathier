#!/usr/bin/env node

import fhr from './api.js';
import renderToConsole from '../src/renderers/consoleRenderer.js';

// interactive-cli.js
import readline from 'readline';

// 1) Set up keypress events on stdin
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// 2) Create a readline interface for when we enter “input” mode
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
});

// 3) State
let mode = 'navigation';        // or 'input'
let selectedIndex = 1;
let data = await fhr.loadData(); 
let treeData = await fhr.createAsciiTree(data, ['title', 'unique_id']);

// 4) Handlers by mode
const handlers = {
  navigation: {
    up:    () => { selectedIndex = Math.max(1, selectedIndex - 1); render(); },
    down:  () => { selectedIndex = selectedIndex + 1; render(); },
    return: () => enterTextMode(),
    c:     (_, key) => { if (key.ctrl) exit(); },
    default: () => { /* ignore or beep */ }
  },
  input: {
    submit: (line) => {
      // process user text in `line`…
      console.log(`You typed: ${line}`);
      exitTextMode();
    }
  }
};

// 5) Render helper
async function render() {
  // clear & render the tree at `selectedIndex`
  console.clear();
  await renderToConsole(treeData, selectedIndex);
}

// 6) Switch into “text entry” mode
function enterTextMode() {
  mode = 'input';
  // turn off raw mode so readline.question works
  process.stdin.setRawMode(false);
  rl.question('Enter new title: ', handlers.input.submit);
}

// 7) Back to navigation
function exitTextMode() {
  mode = 'navigation';
  setImmediate(() => {
    process.stdin.setRawMode(true);
    render();
  });
}

// 8) Global exit
function exit() {
  console.clear();
  rl.close();
  process.exit(0);
}

// 9) Listen for keypresses
process.stdin.on('keypress', (str, key) => {
  if (mode === 'navigation') {
    // dispatch by key.name
    const fn = handlers.navigation[key.name] || handlers.navigation.default;
    fn(str, key);
  }
  // in 'input' mode, readline takes over so we do nothing here
});

// 10) Bootstrap
async function main() {
  // load or pass in your treeData here…
  // treeData = JSON.parse(...)

  await render();
}
main();


