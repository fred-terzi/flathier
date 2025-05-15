import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';
import * as dataHandler from '../src/dataHandler.js';
import addObject from '../src/core/addObject.js';
import deleteObject from '../src/core/deleteObject.js';

async function runDeleteObjectTest() {
  // Use the default extension for consistency
  const testExt = '.fhr';
  const testFileName = 'TestProject';
  const extNoDot = testExt.slice(1);
  const extWithJson = `${extNoDot}.json`;
  const folderPath = path.join(process.cwd(), `.${extNoDot}`);

  // Clean up before test
  try { await fs.rm(folderPath, { recursive: true, force: true }); } catch {}

  // Use init to create the test folder and files
  await init(testFileName, testExt);
  let data = await dataHandler.loadData();

  // Add a new object after the first item (outline '0')
  const newTitle = 'To Be Deleted';
  const outlineNumber = '0';
  data = await addObject(data, outlineNumber, newTitle);
  // Find the outline of the new object
  const added = data.find(item => item.title === newTitle);
  if (!added) {
    console.error('deleteObject() test failed: Could not add object to delete.');
    return;
  }
  // Find the outline and unique_id of the new object
  const addedOutline = added.outline;
  const addedId = added.unique_id;

  // Delete the new object by outline (should always be by outline)
  const newData = deleteObject(data, addedOutline);
  if (!Array.isArray(newData)) {
    console.error('deleteObject() test failed: Did not return an array.');
    return;
  }
  // Check that no object with the deleted unique_id exists
  const idStillThere = newData.find(item => item.unique_id === addedId);
  if (idStillThere) {
    console.error('deleteObject() test failed: Object with deleted unique_id still exists.');
    return;
  }
  console.log('deleteObject() test passed: Object was deleted by outline and outlines recomputed.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runDeleteObjectTest();
}
