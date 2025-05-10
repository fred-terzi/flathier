/**
 * Initializes the project by creating necessary files and directories.
 * @module init
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import generateUniqueId from '../utils/generateUniqueId.js';
import sanitizeSpaces from '../utils/sanitizeSpaces.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Finds the root directory of the project by locating the nearest package.json file.
 * @param {string} [start=__dirname] - The starting directory for the search.
 * @returns {Promise<string>} The path to the project root directory.
 * @throws Will throw an error if package.json is not found.
 */
async function findProjectRoot(start = __dirname) {
  let dir = start;
  while (true) {
    const maybePkg = path.join(dir, 'package.json');
    try {
      await fs.access(maybePkg);
      return dir;
    } catch {
      const parent = path.dirname(dir);
      if (parent === dir) {
        throw new Error('package.json not found');
      }
      dir = parent;
    }
  }
}

/**
 * Initializes the project by creating necessary directories and files.
 * @param {string} [fileName='fhr'] - The base name for the main FHR file.
 * @returns {Promise<void>}
 */
export default async function init(fileName = 'FlatHier') {
  const root = await findProjectRoot();
    // Sanitize the file name to replace spaces with underscores
    fileName = sanitizeSpaces(fileName);
  // Set paths
  const folderPath = path.join(root, '.fhr');
  const templatePath = path.join(root, 'src', 'fhrTemplates', 'fhrTemplate.json');
  const destinationPath = path.join(folderPath, 'template.fhr.json');
  const mainFileName = fileName.endsWith('.fhr.json') ? fileName : `${fileName}.fhr.json`;
  const mainFilePath = path.join(root, mainFileName);

  console.log(`Creating folder at: ${path.relative(process.cwd(), folderPath)}`);
  await fs.mkdir(folderPath, { recursive: true });

  try {
    // Read and parse the base template
    const rawTemplateData = await fs.readFile(templatePath, 'utf-8');
    const templateArray = JSON.parse(rawTemplateData);

    if (!Array.isArray(templateArray)) {
      throw new Error('Template data is not a flat array of objects');
    }

    // Save clean template with updated title only
    const cleanedTemplate = templateArray.map((item, index) => ({
      ...item,
      title: index === 0 ? fileName : item.title,
    }));
    await fs.writeFile(destinationPath, JSON.stringify(cleanedTemplate, null, 2));
    console.log(`Wrote clean template to: ${path.relative(process.cwd(), destinationPath)}`);

    // Create working copy with unique IDs
    const workingCopy = cleanedTemplate.map(item => ({
      ...item,
      unique_id: generateUniqueId(),
    }));
    await fs.writeFile(mainFilePath, JSON.stringify(workingCopy, null, 2));
    console.log(`Created working file at: ${path.relative(process.cwd(), mainFilePath)}`);

  } catch (error) {
    console.error('Error during initialization:', error);
  }

  console.log('Initialization complete.');
}
