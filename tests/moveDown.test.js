import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';
import * as dataHandler from '../src/dataHandler.js';
import addObject from '../src/core/addObject.js';
import moveDown from '../src/core/moveDown.js';

async function runMoveDownTest() {
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

  // Add two new objects after the first item (outline '0')
  data = await addObject(data, '0', 'First Item');
  data = await addObject(data, '1', 'Second Item');

  // Find outlines
  const first = data.find(item => item.title === 'First Item');
  const second = data.find(item => item.title === 'Second Item');
  if (!first || !second) {
    console.error('moveDown() test failed: Could not add objects to move.');
    return;
  }

  // Print data before moveDown
  const idField = `${extNoDot}_ID`;
  console.log('Before moveDown:', data.map(item => ({title: item.title, outline: item.outline, [idField]: item[idField]})));

  // Move the first item down (should swap with the second)
  const movedData = moveDown(data, first.outline);

  // Print data after moveDown
  console.log('After moveDown:', movedData.map(item => ({title: item.title, outline: item.outline, [idField]: item[idField]})));

  // Find the new idField positions after moveDown
  const firstIdx = movedData.findIndex(item => item[idField] === first[idField]);
  const secondIdx = movedData.findIndex(item => item[idField] === second[idField]);
  if (firstIdx !== secondIdx + 1) {
    console.error('moveDown() test failed: First item did not move down (by custom id field).');
    return;
  }
  // Check that outlines are recomputed and unique
  const outlines = movedData.map(item => item.outline);
  const uniqueOutlines = new Set(outlines);
  if (outlines.length !== uniqueOutlines.size) {
    console.error('moveDown() test failed: Outlines are not unique after move.');
    return;
  }
  // Check that both ids are still present
  if (!movedData.find(item => item[idField] === first[idField]) || !movedData.find(item => item[idField] === second[idField])) {
    console.error('moveDown() test failed: One of the items is missing after move.');
    return;
  }
  // Check that the moved item still has the correct title
  if (movedData[firstIdx].title !== 'First Item' || movedData[secondIdx].title !== 'Second Item') {
    console.error('moveDown() test failed: Titles do not match expected order after move.');
    return;
  }
  console.log('moveDown() test passed: Item was moved down and outlines recomputed, verified by custom id field and title order.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runMoveDownTest();
}
