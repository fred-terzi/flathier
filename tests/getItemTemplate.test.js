import { describe, it, beforeAll, afterAll } from 'vitest';
import { strict as assert } from 'assert';
import fs from 'fs/promises';
import path from 'path';
import getLastTemplateObject from '../src/utils/getItemTemplate.js';

describe('getLastTemplateObject', () => {
    const templatePath = path.resolve(__dirname, '../src/fhrTemplates/template.fhr.json');

    beforeAll(async () => {
        // Create a mock template file for testing
        const mockTemplate = [
            { id: 1, name: 'First Object' },
            { id: 2, name: 'Second Object' },
            { id: 3, name: 'Last Object' }
        ];
        await fs.writeFile(templatePath, JSON.stringify(mockTemplate, null, 2));
    });

    afterAll(async () => {
        // Clean up the mock template file after tests if it exists
        try {
            await fs.unlink(templatePath);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
    });

    it('should return the last object from the template file', async () => {
        const lastObject = await getLastTemplateObject();
        assert.deepEqual(lastObject, { id: 3, name: 'Last Object' });
    });

    it('should return null if the template file is empty', async () => {
        await fs.writeFile(templatePath, JSON.stringify([]));
        const lastObject = await getLastTemplateObject();
        assert.equal(lastObject, null);
    });

    it('should return null if the template file does not exist', async () => {
        await fs.unlink(templatePath); // Remove the file
        const lastObject = await getLastTemplateObject();
        assert.equal(lastObject, null);
    });
});