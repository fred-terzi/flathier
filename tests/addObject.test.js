import fs from 'fs/promises';
import path from 'path';
import addObject from '../src/core/addObject.js';
import init from '../src/commands/init.js';
import * as dataHandler from '../src/dataHandler.js';

async function runAddObjectTest() {
  // Use the default extension for consistency
  const testExt = '.fhr';
  const testFileName = 'TestProject';
  const extNoDot = testExt.slice(1);
  const extWithJson = `${extNoDot}.json`;
  const folderPath = path.join(process.cwd(), `.${extNoDot}`);
  const mainFileName = `${testFileName}.${extWithJson}`;
  const mainFilePath = path.join(folderPath, mainFileName);

  // Clean up before test
  try { await fs.rm(folderPath, { recursive: true, force: true }); } catch {}

  // Use init to create the test folder and files
  await init(testFileName, testExt);
  let data = await dataHandler.loadData();

  // Add a new object after the first item (outline '0')
  const newTitle = 'Added by addObject test';
  const outlineNumber = '0';
  const idField = `${extNoDot}_ID`;
  try {
    const updatedData = await addObject(data, outlineNumber, newTitle);
    if (!Array.isArray(updatedData)) throw new Error('addObject did not return an array');
    const found = updatedData.find(item => item.title === newTitle);
    if (!found) throw new Error('New object not found in data after addObject');
    if (!found[idField]) throw new Error('New object missing custom ID field');
    if (found.outline === 'pending') throw new Error('New object outline not computed');
    console.log('addObject() test passed: New object added with custom ID field and outline computed.');
  } catch (err) {
    console.error('addObject() test failed:', err.message);
    return;
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runAddObjectTest();
}
