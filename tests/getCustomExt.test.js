import getCustomExt from '../src/utils/getCustomExt.js';
import fs from 'fs/promises';
import path from 'path';

async function runGetCustomExtTest() {
  const customExtStorePath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    '../src/fhrTemplates/customExtStore.json'
  );

  // Backup the original file
  let originalContent = null;
  try {
    originalContent = await fs.readFile(customExtStorePath, 'utf-8');
  } catch {}

  // Test 1: Should return the value from customExtStore.json
  try {
    await fs.writeFile(customExtStorePath, '[{"customExt": ".unit"}]', 'utf-8');
    const ext = await getCustomExt();
    if (ext === '.unit') {
      console.log('getCustomExt() test 1 passed: returns value from customExtStore.json');
    } else {
      console.error('getCustomExt() test 1 failed: expected .unit, got', ext);
    }
  } catch (err) {
    console.error('getCustomExt() test 1 failed:', err.message);
  }

  // Test 2: Should return fallback if file is missing or invalid
  try {
    await fs.writeFile(customExtStorePath, 'invalid json', 'utf-8');
    const ext = await getCustomExt();
    if (ext === '.fhr') {
      console.log('getCustomExt() test 2 passed: returns fallback on invalid file');
    } else {
      console.error('getCustomExt() test 2 failed: expected .fhr, got', ext);
    }
  } catch (err) {
    console.error('getCustomExt() test 2 failed:', err.message);
  }

  // Restore the original file
  if (originalContent !== null) {
    await fs.writeFile(customExtStorePath, originalContent, 'utf-8');
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runGetCustomExtTest();
}
