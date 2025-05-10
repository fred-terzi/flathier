import fs from 'fs/promises';
import path from 'path';

/**
 * Reads the last object from the .fhr/template.fhr.json file.
 * @returns {Promise<Object|null>} The last object in the template, or null if it doesn't exist.
 */
export default async function getLastTemplateObject() {
    try {
        // Resolve the path to the template file
        const templatePath = path.resolve(__dirname, '../fhrTemplates/template.fhr.json');

        // Read and parse the template file
        const fileContent = await fs.readFile(templatePath, 'utf-8');
        const templateData = JSON.parse(fileContent);

        // Return the last object if it exists
        return templateData[templateData.length - 1] || null;
    } catch (error) {
        console.error('Error reading the template file:', error);
        return null;
    }
}