import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';
import * as dataHandler from '../src/dataHandler.js';

async function runDataHandlerTest() {
  const testRoot = process.cwd();
  const testExt = '.fhr'; // Use the same extension as in customExtStore.json
  const testFileName = 'TestProject';
  const extNoDot = testExt.slice(1);
  const extWithJson = `${extNoDot}.json`;
  const folderPath = path.join(testRoot, `.${extNoDot}`);
  const mainFileName = `${testFileName}.${extWithJson}`;
  const mainFilePath = path.join(folderPath, mainFileName);

  // Clean up before test
  try { await fs.rm(folderPath, { recursive: true, force: true }); } catch {}

  // Use init to create the test folder and files
  await init(testFileName, testExt);

  // Test loadData
  let data;
  try {
    data = await dataHandler.loadData();
    if (!Array.isArray(data)) throw new Error('Data is not an array');
    if (data.length === 0) throw new Error('Data array is empty');
    console.log('loadData() test passed');
  } catch (err) {
    console.error('loadData() test failed:', err.message);
    return;
  }

  // Test getData
  try {
    const cached = dataHandler.getData();
    if (JSON.stringify(cached) !== JSON.stringify(data)) throw new Error('getData() does not match loaded data');
    console.log('getData() test passed');
  } catch (err) {
    console.error('getData() test failed:', err.message);
    return;
  }

  // Test setData and saveData
  try {
    const newItem = { unique_id: 'test-id', title: 'Added', hier: '1', outline: '2', status: 'NEW', description: 'Added by test' };
    const newData = [...data, newItem];
    dataHandler.setData(newData);
    await dataHandler.saveData();
    // Reload from disk to verify
    const reloaded = JSON.parse(await fs.readFile(mainFilePath, 'utf-8'));
    if (!reloaded.find(item => item.unique_id === 'test-id')) throw new Error('saveData() did not persist new item');
    console.log('setData() and saveData() test passed');
  } catch (err) {
    console.error('setData()/saveData() test failed:', err.message);
    return;
  }

  // Test refreshData
  try {
    const refreshed = await dataHandler.refreshData();
    if (!Array.isArray(refreshed) || refreshed.length === 0) throw new Error('refreshData() did not return valid data');
    console.log('refreshData() test passed');
  } catch (err) {
    console.error('refreshData() test failed:', err.message);
    return;
  }

  // Clean up after test
  // try { await fs.rm(folderPath, { recursive: true, force: true }); } catch {}
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runDataHandlerTest();
}
