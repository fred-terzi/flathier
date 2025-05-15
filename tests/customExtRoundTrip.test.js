import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';
import getCustomExt from '../src/utils/getCustomExt.js';
import * as dataHandler from '../src/dataHandler.js';
import addObject from '../src/core/addObject.js';
import deleteObject from '../src/core/deleteObject.js';
import promote from '../src/core/promote.js';
import demote from '../src/core/demote.js';
import moveUp from '../src/core/moveUp.js';
import moveDown from '../src/core/moveDown.js';
import createAsciiTree from '../src/core/asciiTree.js';

async function runFullUserCaseRoundTripTest() {
  const testExt = '.roundtrip';
  const extNoDot = testExt.slice(1);
  const folderPath = path.join(process.cwd(), `.${extNoDot}`);
  const customExtStorePath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    '../src/fhrTemplates/customExtStore.json'
  );

  // Clean up before test
  try { await fs.rm(folderPath, { recursive: true, force: true }); } catch {}
  try { await fs.unlink(customExtStorePath); } catch {}

  // 1. Init
  await init('RoundTripTest', testExt);
  let extFromGetter = await getCustomExt();
  if (extFromGetter !== testExt) {
    console.error('getCustomExt after init failed: Expected', testExt, 'but got', extFromGetter);
    return;
  }
  console.log('getCustomExt after init passed.');

  // 2. Load data
  let data = await dataHandler.loadData();
  if (!Array.isArray(data) || data.length === 0) {
    console.error('loadData failed: No data loaded.');
    return;
  }
  console.log('loadData passed.');

  // 3. Add objects
  data = await addObject(data, '0', 'First Item');
  data = await addObject(data, '1', 'Second Item');
  const first = data.find(item => item.title === 'First Item');
  data = await addObject(data, first.outline, 'Child of First');
  const child = data.find(item => item.title === 'Child of First');
  data = await addObject(data, child.outline, 'Grandchild of First');
  console.log('addObject passed.');

  // 4. Promote grandchild
  const grandchild = data.find(item => item.title === 'Grandchild of First');
  data = promote(data, grandchild.outline);
  console.log('promote passed.');

  // 5. Demote grandchild
  const updatedGrandchild = data.find(item => item.title === 'Grandchild of First');
  data = demote(data, updatedGrandchild.outline);
  console.log('demote passed.');

  // 6. Move up and down
  data = moveUp(data, child.outline);
  data = moveDown(data, child.outline);
  console.log('moveUp/moveDown passed.');

  // Print tree after moveUp/moveDown to inspect outlines
  const treeAfterMoves = await createAsciiTree(data, ['title', 'outline']);
  console.log('Tree after moveUp/moveDown:');
  treeAfterMoves.forEach(row => console.log(row));

  // 7. Delete grandchild
  const grandchildAfterMoves = data.find(item => item.outline === '1.1' && item.title === 'Grandchild of First');
  if (!grandchildAfterMoves) {
    console.error('Could not find Grandchild of First with outline 1.1 after moveUp/moveDown.');
    return;
  }
  // Use outline number instead of custom ID for deleteObject
  const grandchildOutline = grandchildAfterMoves.outline;
  const afterDelete = deleteObject(data, grandchildOutline);
  if (!Array.isArray(afterDelete)) {
    console.error('deleteObject failed: Returned undefined or not an array.');
    return;
  }
  if (afterDelete.find(item => item.outline === grandchildOutline)) {
    console.error('deleteObject failed: Grandchild still present.');
    return;
  }
  data = afterDelete;
  console.log('deleteObject passed.');

  // 8. Save and reload data
  await dataHandler.setData(data);
  await dataHandler.saveData();
  const reloaded = await dataHandler.loadData();
  if (reloaded.length !== data.length) {
    console.error('saveData/loadData roundtrip failed: Data length mismatch.');
    return;
  }
  console.log('saveData/loadData roundtrip passed.');

  // 9. ASCII tree
  const treeRows = await createAsciiTree(reloaded, ['title']);
  if (!Array.isArray(treeRows) || treeRows.length === 0) {
    console.error('asciiTree failed: Output is empty or not an array.');
    return;
  }
  console.log('asciiTree passed.');

  console.log('Full user-case roundtrip test passed.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runFullUserCaseRoundTripTest();
}
