import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';
import * as dataHandler from '../src/dataHandler.js';
import addObject from '../src/core/addObject.js';
import createAsciiTree from '../src/core/asciiTree.js';

async function runAsciiTreeTest() {
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

  // Add a child to 'First Item'
  const first = data.find(item => item.title === 'First Item');
  data = await addObject(data, first.outline, 'Child of First');

  // Prepare fields to include in the ASCII tree
  const fieldsToInclude = ['title'];

  // Generate the ASCII tree
  const treeRows = await createAsciiTree(data, fieldsToInclude);

  // Print the ASCII tree
  console.log('ASCII Tree Output:\n' + treeRows.join(''));

  // Basic checks
  if (!Array.isArray(treeRows) || treeRows.length === 0) {
    console.error('asciiTree() test failed: Output is empty or not an array.');
    return;
  }
  if (!treeRows.some(row => row.includes('First Item')) || !treeRows.some(row => row.includes('Child of First'))) {
    console.error('asciiTree() test failed: Output missing expected titles.');
    return;
  }
  if (!treeRows[0].includes('TestProject')) {
    console.error('asciiTree() test failed: Root node missing or not first.');
    return;
  }
  console.log('asciiTree() test passed: Output contains expected structure and titles.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runAsciiTreeTest();
}
