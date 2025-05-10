import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import {
  loadData,
  getData,
  setData,
  saveData,
  refreshData,
} from '../src/dataHandler.js';

const rootDir = process.cwd();
const realFhrPath = path.join(rootDir, 'dummy_data', 'dummyData.fhr.json');
const activeFhrPath = path.join(rootDir, 'test-file.fhr.json'); // will be renamed to .fhr.json for test
const tempActiveName = path.join(rootDir, '.fhr.json');
const realBackupPath = path.join(rootDir, 'real-fhr.bak.json');

// Test data
const initialData = [
  { id: '1', title: 'First' },
  { id: '2', title: 'Second' },
];
const newData = [
  { id: '3', title: 'Third' },
  { id: '4', title: 'Fourth' },
];

async function setupTestFile() {
  await fs.writeFile(activeFhrPath, JSON.stringify(initialData, null, 2));
  await fs.rename(activeFhrPath, tempActiveName); // Rename to be recognized
}

describe('dataHandler', () => {
  beforeAll(async () => {
    try {
      await fs.rename(realFhrPath, realBackupPath); // back up real file
    } catch {}
    await setupTestFile();
  });

  afterAll(async () => {
    try {
      await fs.unlink(tempActiveName); // remove test file
      await fs.rename(realBackupPath, realFhrPath); // restore real file
    } catch {}
  });

  it('loads data from .fhr.json file', async () => {
    const data = await loadData();
    expect(data).toEqual(initialData);
  });

  it('gets cached data after load', () => {
    const data = getData();
    expect(data).toEqual(initialData);
  });

  it('updates data in memory', () => {
    setData(newData);
    const updated = getData();
    expect(updated).toEqual(newData);
  });

  it('saves data to disk', async () => {
    await saveData();
    const saved = JSON.parse(await fs.readFile(tempActiveName, 'utf-8'));
    expect(saved).toEqual(newData);
  });

  it('refreshes data from disk', async () => {
    await fs.writeFile(tempActiveName, JSON.stringify(initialData, null, 2));
    await refreshData();
    const refreshed = getData();
    expect(refreshed).toEqual(initialData);
  });
});
