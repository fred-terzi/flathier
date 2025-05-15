import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';
import * as dataHandler from '../src/dataHandler.js';
import addObject from '../src/core/addObject.js';
import deleteObject from '../src/core/deleteObject.js';

// Use the correct custom ID field for all checks and prints
async function runDeleteObjectTest() {
  const testExt = '.fhr';
  const extNoDot = testExt.slice(1);
  const idField = `${extNoDot}_ID`;
  // Clean up and initialize
  const folderPath = path.join(process.cwd(), `.${extNoDot}`);
  try { await fs.rm(folderPath, { recursive: true, force: true }); } catch {}
  await init('TestProject', testExt);
  let data = await dataHandler.loadData();
  // Add a new object
  data = await addObject(data, '0', 'To Delete');
  const toDelete = data.find(item => item.title === 'To Delete');
  if (!toDelete || !toDelete[idField]) {
    console.error('deleteObject() test failed: New object missing custom ID field');
    return;
  }
  // Delete the object by custom ID field
  const newData = deleteObject(data, toDelete[idField]);
  if (newData.find(item => item[idField] === toDelete[idField])) {
    console.error('deleteObject() test failed: Object with deleted custom ID field still exists.');
    return;
  }
  console.log('deleteObject() test passed: Object deleted by custom ID field.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runDeleteObjectTest();
}
