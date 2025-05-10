import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { loadData, saveData, getDataPath } from '../src/dataHandler.js';
import fs from 'fs/promises';
import path from 'path';

vi.mock('fs/promises');

describe('dataHandler.js', () => {
    const mockFilePath = path.resolve(process.env.FHR_ROOT_DIR, 'Test_1.fhr.json');
    const mockData = [{ id: 1, name: 'Test Object' }];

    beforeEach(() => {
        process.env.FHR_ROOT_DIR = '/path/to';
        fs.readdir.mockResolvedValue(['Test_1.fhr.json']);
        fs.readFile.mockResolvedValue(JSON.stringify(mockData));
        fs.writeFile.mockResolvedValue();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('loadData should load and parse JSON data', async () => {
        const data = await loadData();
        expect(data).toEqual(mockData);
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });

    it('saveData should write JSON data to file', async () => {
        await saveData(mockData);
        expect(fs.writeFile).toHaveBeenCalledWith(mockFilePath, JSON.stringify(mockData, null, 2), 'utf-8');
    });

    it('getDataPath should return the correct file path', async () => {
        const filePath = await getDataPath();
        expect(filePath).toBe(mockFilePath);
    });
});