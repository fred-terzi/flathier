import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';
import * as dataHandler from '../src/dataHandler.js';
import addObject from '../src/core/addObject.js';
import moveUp from '../src/core/moveUp.js';

async function runMoveUpTest() {
  // Use the default extension for consistency
  const testExt = '.fhr';
  const testFileName = 'TestProject';
  const extNoDot = testExt.slice(1);
  const idField = `${extNoDot}_ID`;
  const folderPath = path.join(process.cwd(), `.${extNoDot}`);

  // Clean up before test
  try { await fs.rm(folderPath, { recursive: true, force: true }); } catch {}

  // Use init to create the test folder and files
  await init(testFileName, testExt);
  let data = await dataHandler.loadData();

  // Add two new objects after the first item (outline '0')
  data = await addObject(data, '0', 'First Item');
  data = await addObject(data, '1', 'Second Item');

  // Find outlines
  const first = data.find(item => item.title === 'First Item');
  const second = data.find(item => item.title === 'Second Item');
  if (!first || !second) {
    console.error('moveUp() test failed: Could not add objects to move.');
    return;
  }

  // Print data before moveUp
  console.log('Before moveUp:', data.map(item => ({title: item.title, outline: item.outline, [idField]: item[idField]})));

  // Move the second item up (should swap with the first)
  const movedData = moveUp(data, second.outline);

  // Print data after moveUp
  console.log('After moveUp:', movedData.map(item => ({title: item.title, outline: item.outline, [idField]: item[idField]})));

  // Find the new idField positions after moveUp
  const firstIdx = movedData.findIndex(item => item[idField] === first[idField]);
  const secondIdx = movedData.findIndex(item => item[idField] === second[idField]);
  if (secondIdx !== firstIdx - 1) {
    console.error('moveUp() test failed: Second item did not move up (by custom id field).');
    return;
  }
  // Check that outlines are recomputed and unique
  const outlines = movedData.map(item => item.outline);
  const uniqueOutlines = new Set(outlines);
  if (outlines.length !== uniqueOutlines.size) {
    console.error('moveUp() test failed: Outlines are not unique after move.');
    return;
  }
  // Check that both ids are still present
  if (!movedData.find(item => item[idField] === first[idField]) || !movedData.find(item => item[idField] === second[idField])) {
    console.error('moveUp() test failed: One of the items is missing after move.');
    return;
  }
  // Check that the moved item still has the correct title
  if (movedData[firstIdx].title !== 'First Item' || movedData[secondIdx].title !== 'Second Item') {
    console.error('moveUp() test failed: Titles do not match expected order after move.');
    return;
  }
  console.log('moveUp() test passed: Item was moved up and outlines recomputed, verified by custom id field and title order.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runMoveUpTest();
}
