import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';
import * as dataHandler from '../src/dataHandler.js';
import addObject from '../src/core/addObject.js';
import promote from '../src/core/promote.js';

async function runPromoteTest() {
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

  // Find the child
  const child = data.find(item => item.title === 'Child of First');
  if (!child) {
    console.error('promote() test failed: Could not add child to promote.');
    return;
  }

  // Print data before promote
  console.log('Before promote:', data.map(item => ({title: item.title, outline: item.outline, [idField]: item[idField]})));

  // Promote the child (should move it up one level, to be a sibling of its parent)
  const promotedData = promote(data, child.outline);

  // Print data after promote
  console.log('After promote:', promotedData.map(item => ({title: item.title, outline: item.outline, [idField]: item[idField]})));

  // Find the new outline of the promoted child
  const promoted = promotedData.find(item => item[idField] === child[idField]);
  const parent = promotedData.find(item => item[idField] === first[idField]);
  if (!promoted || !parent) {
    console.error('promote() test failed: Promoted or parent item missing after promote.');
    return;
  }
  // The promoted child should now be a sibling of its parent (same outline depth)
  if (promoted.outline.split('.').length !== parent.outline.split('.').length) {
    console.error('promote() test failed: Promoted child is not at the correct hierarchy level.');
    return;
  }
  // The promoted child should come immediately after its parent
  const parentIdx = promotedData.findIndex(item => item[idField] === parent[idField]);
  const promotedIdx = promotedData.findIndex(item => item[idField] === promoted[idField]);
  if (promotedIdx !== parentIdx + 1) {
    console.error('promote() test failed: Promoted child is not immediately after its parent.');
    return;
  }
  console.log('promote() test passed: Child was promoted to be a sibling of its parent, verified by custom id field and outline.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runPromoteTest();
}
