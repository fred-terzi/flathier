import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';
import * as dataHandler from '../src/dataHandler.js';
import addObject from '../src/core/addObject.js';
import demote from '../src/core/demote.js';

async function runDemoteTest() {
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
  data = await addObject(data, '0', 'First Child');
  data = await addObject(data, '1', 'Second Child');

  // Find outlines
  const first = data.find(item => item.title === 'First Child');
  const second = data.find(item => item.title === 'Second Child');
  if (!first || !second) {
    console.error('demote() test failed: Could not add objects to demote.');
    return;
  }

  // Demote the second child (should become a child of the first)
  const demotedData = demote(data, second.outline);
  // Find the demoted node in the new tree
  const demoted = demotedData.find(item => item.title === 'Second Child');
  const newParent = demotedData.find(item => item.title === 'First Child');

  // Check that the demoted node's hier is one level deeper than its new parent
  if (!demoted || !newParent) {
    console.error('demote() test failed: Could not find demoted or parent node.');
    return;
  }
  const demotedHier = parseInt(demoted.hier, 10);
  const parentHier = parseInt(newParent.hier, 10);
  if (demotedHier !== parentHier + 1) {
    console.error('demote() test failed: Demoted node is not one level deeper than its new parent.');
    return;
  }
  // Check that the demoted node's outline starts with its new parent's outline
  if (!demoted.outline.startsWith(newParent.outline + '.')) {
    console.error('demote() test failed: Demoted node outline does not start with parent outline.');
    return;
  }
  console.log('demote() test passed: Node was demoted to be a child of its previous sibling.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runDemoteTest();
}
