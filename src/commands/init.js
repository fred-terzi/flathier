/**
 * Initializes the project by creating necessary files and directories.
 * @module init
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('Initializing project...');

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
export async function init(fileName = 'fhr') {
  const root = await findProjectRoot();

  // Create .fhr directory
  const folderPath = path.join(root, '.fhr');
  const relativePath = path.relative(process.cwd(), folderPath);
  console.log(`Creating folder at: ${relativePath}`);
  await fs.mkdir(folderPath, { recursive: true });

  // Copy template file to .fhr directory
  const destinationPath = path.join(folderPath, 'template.fhr.json');
  const templatePath = path.join(root, 'src', 'fhrTemplates', 'fhrTemplate.json');
  const templateRelativePath = path.relative(process.cwd(), destinationPath);
  console.log(`Copying template to ${templateRelativePath}`);
  try {
    await fs.copyFile(templatePath, destinationPath);
  } catch (error) {
    console.error('Error copying template:', error);
  }

  // Change the title of the first item in the template to the file name
  try {
    const templateData = await fs.readFile(destinationPath, 'utf-8');
    const updatedTemplateData = templateData.replace(/"title": ".*?"/, `"title": "${fileName}"`);
    await fs.writeFile(destinationPath, updatedTemplateData);
    console.log(`Updated template title to "${fileName}"`);
  }
  catch (error) {
    console.error('Error updating template title:', error);
  }

  // Create main FHR file
  const mainFileName = fileName.endsWith('.fhr.json') ? fileName : `${fileName}.fhr.json`;
  const mainFilePath = path.join(root, mainFileName);
  const mainFileRelativePath = path.relative(process.cwd(), mainFilePath);
  console.log(`Creating main file at: ${mainFileRelativePath}`);
  try {
    const templateData = await fs.readFile(destinationPath, 'utf-8');
    await fs.writeFile(mainFilePath, templateData);
  } catch (error) {
    console.error('Error creating main file:', error);
  }

  console.log('Initialization complete.');
}

// Execute the init function with the provided argument
init(process.argv[2]).catch((error) => {
  console.error('Error during initialization:', error);
});