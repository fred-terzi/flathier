#!/usr/bin/env node

import readline from 'readline';
import { renderToConsole, resetScreen } from '../src/renderers/consoleRenderer.js';
import fhr from 'flathier';
import { handleAddItem } from '../src/cliHandlers/addHandler.js';
import { handleDeleteItem } from '../src/cliHandlers/deleteHandler.js';
import { error } from 'console';

// ──────────────────────────────────────────────────────────
// Graceful error handling: suppress built-in messages and exit
// ──────────────────────────────────────────────────────────
process.on('uncaughtException', () => process.exit(1));
process.on('unhandledRejection', () => process.exit(1));


// ──────────────────────────────────────────────────────────
// Enable keypress events on stdin (raw mode if tty)
// ──────────────────────────────────────────────────────────
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}


// ──────────────────────────────────────────────────────────
// EDIT MODE UTILITIES
// ──────────────────────────────────────────────────────────

/**
 * Enter “edit” mode: clear buffer, detach navigation listener, show cursor.
 */
function startEdit() {
  state.mode = 'edit';
  state.editBuffer = '';
  detachKeypressListener();
  process.stdout.write('\x1B[?25h'); // show cursor
}

/**
 * Exit “edit” mode: hide cursor, re-attach navigation listener, re-enable raw mode.
 */
function exitEdit() {
  state.mode = 'navigate';
  state.editBuffer = '';
  attachKeypressListener();
  process.stdout.write('\x1B[?25l'); // hide cursor
  process.stdin.setRawMode(true);
}

/**
 * Normalize key objects into consistent strings (e.g. Ctrl+n).
 * @param {{ ctrl: boolean, name: string }} key
 * @returns {string}
 */
function normalizeKey(key) {
  let prefix = '';
  if (key.ctrl)  prefix += 'Ctrl+';
  if (key.shift) prefix += 'Shift+';
  return `${prefix}${key.name}`;
}




// ──────────────────────────────────────────────────────────
// STATE & INITIAL RENDER
// ──────────────────────────────────────────────────────────

let selectedIndex = 0;
const state = {
  mode: 'navigate',   // 'navigate' or 'edit'
  editBuffer: '',
};

let data    = await fhr.loadData();
let tree    = await fhr.createAsciiTree(data, ['title', 'unique_id']);

// Clear screen and draw initial tree
resetScreen();
await renderToConsole(tree, selectedIndex);


// ──────────────────────────────────────────────────────────
// NAVIGATION & EDIT HANDLERS
// ──────────────────────────────────────────────────────────

const keyMap = {
  up:    () => { selectedIndex = Math.max(0, selectedIndex - 1); renderToConsole(tree, selectedIndex); },
  down:  () => { selectedIndex = Math.min(tree.length - 2, selectedIndex + 1); renderToConsole(tree, selectedIndex); },
  escape: () => {
    console.clear();
    console.log('Exiting...');
    process.exit(0);
  },
  'Ctrl+n': async () => {
    // Trigger “add item” flow
    state.mode = 'edit';
    startEdit();

    const result = await handleAddItem(
      data,
      tree,
      selectedIndex,
      renderToConsole,
      resetScreen,
      fhr
    );

    exitEdit();

    // Update local state from result
    data          = result.data;
    tree          = result.tree;
    selectedIndex = result.selectedIndex;
    state.mode    = 'navigate';
  },
  backspace: async () => {
    // Trigger “delete item” flow
    const result = await handleDeleteItem(data, selectedIndex);

    data          = result.data;
    tree          = result.tree;
    selectedIndex = Math.max(0, selectedIndex - 1);

    resetScreen();
    await renderToConsole(tree, selectedIndex);
  },
  delete: async () => {
    // Same as backspace
    const result = await handleDeleteItem(data, selectedIndex, errorMessage);

    data          = result.data;
    tree          = result.tree;
    selectedIndex = Math.max(0, selectedIndex - 1);

    resetScreen();
    await renderToConsole(tree, selectedIndex);
  },
  // Right arrow for demote
  right: async () => {
    const uidToDemote = data[selectedIndex + 1].unique_id;
    const outlineToDemote = data[selectedIndex + 1].outline;
    // Demote in memory using return value
    const newData = await fhr.demote(data, outlineToDemote);
    data = newData;
    // Persist change
    await fhr.saveData(data);
    // Rebuild the ASCII tree
    tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);

    selectedIndex = Math.max(0, selectedIndex);

    resetScreen();
    await renderToConsole(tree, selectedIndex);
  },
  // Left arrow for promote
  left: async () => {
    const uidToPromote = data[selectedIndex + 1].unique_id;
    const outlineToPromote = data[selectedIndex + 1].outline;
    // Promote in memory using return value
    const newData = await fhr.promote(data, outlineToPromote);
    data = newData;
    // Persist change
    await fhr.saveData(data);
    // Rebuild the ASCII tree
    tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);

    selectedIndex = Math.max(0, selectedIndex);

    resetScreen();
    await renderToConsole(tree, selectedIndex);
  },
  // shift + up for move up
  'Shift+up': async () => {
    // If selected item is one after root do nothing
    if (selectedIndex === 0) {
      return;
    }
    const uidToMoveUp = data[selectedIndex + 1].unique_id;
    const outlineToMoveUp = data[selectedIndex + 1].outline;
    // Move up in memory using return value
    const newData = await fhr.moveUp(data, outlineToMoveUp);
    data = newData;
    fhr.setData(data);        // ← populate cachedData
    // Persist change
    await fhr.saveData(data);
    // Rebuild the ASCII tree
    tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);

    // Find index of moved item
    const movedItemIndex = data.findIndex(item => item.unique_id === uidToMoveUp);
    selectedIndex = Math.max(0, movedItemIndex - 1);

    resetScreen();
    await renderToConsole(tree, selectedIndex);
  },
  // shift + down for move down
  'Shift+down': async () => {

    const uidToMoveDown = data[selectedIndex + 1].unique_id;
    const outlineToMoveDown = data[selectedIndex + 1].outline;
    // Move down in memory using return value
    const newData = await fhr.moveDown(data, outlineToMoveDown);
    data = newData;
    fhr.setData(data);        // ← populate cachedData
    // Persist change
    await fhr.saveData(data);
    // Rebuild the ASCII tree
    tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);

    // Find index of moved item
    const movedItemIndex = data.findIndex(item => item.unique_id === uidToMoveDown);
    selectedIndex = Math.max(0, movedItemIndex - 1);

    resetScreen();
    await renderToConsole(tree, selectedIndex);
  },
  // (Extend with more handlers as needed)
};


// ──────────────────────────────────────────────────────────
// KEYPRESS LISTENER MANAGEMENT
// ──────────────────────────────────────────────────────────

let isKeypressListenerAttached = false;

/**
 * Attach the primary keypress handler if not already attached.
 */
function attachKeypressListener() {
  if (!isKeypressListenerAttached) {
    process.stdin.on('keypress', keypressHandler);
    isKeypressListenerAttached = true;
  }
}

/**
 * Detach the primary keypress handler if attached.
 */
function detachKeypressListener() {
  if (isKeypressListenerAttached) {
    process.stdin.off('keypress', keypressHandler);
    isKeypressListenerAttached = false;
  }
}

/**
 * Central keypress handler: routes to edit-mode logic or navigation handlers.
 * @param {string} str  The raw character string.
 * @param {{name: string, ctrl?: boolean}} key The parsed key object.
 */
function keypressHandler(str, key) {
  // EDIT MODE: capture printable chars, backspace, return, or exit
  if (state.mode === 'edit') {
    if (key.name === 'escape') {
      exitEdit();
      return;
    }

    if (key.name === 'backspace') {
      // Remove last char from buffer, redraw prompt line
      state.editBuffer = state.editBuffer.slice(0, -1);
      const [, height] = process.stdout.getWindowSize();
      const row = height - 1; 
      process.stdout.write(
        `\x1b[${row};1H\x1b[2K\x1b[34mEnter Title:\x1b[0m ${state.editBuffer}`
      );
      return;
    }

    if (key.name === 'return') {
      console.log(`\nFinal input: ${state.editBuffer}`);
      exitEdit();
      return;
    }

    // Append printable character
    if (str) {
      state.editBuffer += str;
      process.stdout.write(str);
    }

    return; // stop further processing
  }

  // GLOBAL CTRL+C to exit
  if (key.ctrl && key.name === 'c') {
    console.log('Exiting...');
    process.exit(0);
  }

  // NAVIGATION MODE: lookup in keyMap
  const normalized = normalizeKey(key);
  const handler    = keyMap[normalized];
  if (handler) {
    Promise.resolve(handler(str, key)).catch((err) => {
      console.error('❌ Handler error:', err);
      process.stdin.setRawMode(true);
    });
  }
}


// ──────────────────────────────────────────────────────────
// Initialize listener
// ──────────────────────────────────────────────────────────
attachKeypressListener();
