import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('Initializing project...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function findProjectRoot(start = __dirname) {
  let dir = start;
  console.log(`Starting search for project root from: ${start}`);
  while (true) {
    const maybePkg = path.join(dir, 'package.json');
    console.log(`Checking for package.json at: ${maybePkg}`);
    try {
      await fs.access(maybePkg);
      console.log(`Found package.json at: ${dir}`);
      return dir;
    } catch {
      const parent = path.dirname(dir);
      if (parent === dir) {
        console.error('package.json not found');
        throw new Error('package.json not found');
      }
      console.log(`Moving up to parent directory: ${parent}`);
      dir = parent;
    }
  }
}

// Copy fhrTemplate to the .frh folder
async function copyTemplateToFolder(root, folderPath) {
  const templatePath = path.join(root, 'src', 'fhrTemplates', 'fhrTemplate.json');
  const destinationPath = path.join(folderPath, 'template.json');
  console.log(`Copying template from ${templatePath} to ${destinationPath}`);
  try {
    await fs.copyFile(templatePath, destinationPath);
    console.log('Template copied successfully.');
  } catch (error) {
    console.error('Error copying template:', error);
  }
}

export async function init() {
  console.log('Initializing project...');
  const root = await findProjectRoot();
  console.log(`Project root found at: ${root}`);
  const folderPath = path.join(root, '.fhr');
  console.log(`Creating folder at: ${folderPath}`);
  await fs.mkdir(folderPath, { recursive: true });
  console.log('Folder created successfully.');

  await copyTemplateToFolder(root, folderPath);
  console.log('Initialization complete.');
}


init()
  .then(() => {
    console.log('Initialization complete.');
  })
  .catch((error) => {
    console.error('Error during initialization:', error);
  });