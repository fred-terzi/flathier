import { describe, it } from 'vitest';
import { strict as assert } from 'assert';
import fs from 'fs/promises';
import path from 'path';
import computeOutlines from '../src/utils/computeOutlines.js';

describe('computeOutlines', () => {
    it('should compute correct outlines for dummy data', async () => {
        // Load dummy data
        const dummyDataPath = path.resolve(__dirname, '../dummy_data/dummyData.fhr.json');
        const dummyData = JSON.parse(await fs.readFile(dummyDataPath, 'utf-8'));

        // Compute outlines
        const result = computeOutlines(dummyData);

        // Validate the result
        result.forEach((item, index) => {
            assert.ok(item.outline, `Item at index ${index} should have an outline.`);
        });

        console.log('Computed outlines:', result.map(item => item.outline));
    });
});