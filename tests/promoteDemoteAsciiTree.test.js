import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';
import * as dataHandler from '../src/dataHandler.js';
import addObject from '../src/core/addObject.js';
import promote from '../src/core/promote.js';
import demote from '../src/core/demote.js';
import createAsciiTree from '../src/core/asciiTree.js';

async function runPromoteDemoteAsciiTreeTest() {
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

  // Add a grandchild to 'Child of First'
  const child = data.find(item => item.title === 'Child of First');
  data = await addObject(data, child.outline, 'Grandchild of First');

  // Print initial tree
  const fieldsToInclude = ['title'];
  let treeRows = await createAsciiTree(data, fieldsToInclude);
  console.log('Initial ASCII Tree:\n' + treeRows.join(''));

  // Promote the grandchild (should become sibling of its parent)
  const grandchild = data.find(item => item.title === 'Grandchild of First');
  data = promote(data, grandchild.outline);
  treeRows = await createAsciiTree(data, fieldsToInclude);
  console.log('After promote (grandchild promoted to sibling of its parent):\n' + treeRows.join(''));

  // Demote the previously promoted grandchild (should become child of previous sibling)
  const updatedGrandchild = data.find(item => item.title === 'Grandchild of First');
  data = demote(data, updatedGrandchild.outline);
  treeRows = await createAsciiTree(data, fieldsToInclude);
  console.log('After demote (grandchild demoted back to child):\n' + treeRows.join(''));

  // Promote the grandchild again (should become sibling of its parent again)
  const demotedGrandchild = data.find(item => item.title === 'Grandchild of First');
  data = promote(data, demotedGrandchild.outline);
  treeRows = await createAsciiTree(data, fieldsToInclude);
  console.log('After promote again (grandchild promoted to sibling of its parent):\n' + treeRows.join(''));
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runPromoteDemoteAsciiTreeTest();
}
