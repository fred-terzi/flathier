import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('Initializing project...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Create fhr project file in main directory
async function createFhrFile(root, fileName) {
  const fhrFilePath = path.join(root, fileName);
  const fhrFileRelativePath = path.relative(process.cwd(), fhrFilePath);
  console.log(`Creating FHR file at: ${fhrFileRelativePath}`);
  try {
    await fs.writeFile(fhrFilePath, JSON.stringify({}));
  } catch (error) {
    console.error('Error creating FHR file:', error);
  }
}

export async function init(fileName = 'fhr') {
  const root = await findProjectRoot();
  const folderPath = path.join(root, '.fhr');
  const relativePath = path.relative(process.cwd(), folderPath);
  console.log(`Creating folder at: ${relativePath}`);
  await fs.mkdir(folderPath, { recursive: true });

  const destinationPath = path.join(folderPath, 'template.fhr.json');
  const templatePath = path.join(root, 'src', 'fhrTemplates', 'fhrTemplate.json');
  const templateRelativePath = path.relative(process.cwd(), destinationPath);
  console.log(`Copying template to ${templateRelativePath}`);
  try {
    await fs.copyFile(templatePath, destinationPath);
  } catch (error) {
    console.error('Error copying template:', error);
  }

  const mainFileName = fileName.endsWith('.fhr.json') ? fileName : `${fileName}.fhr.json`;
  const mainFilePath = path.join(root, mainFileName);
  const mainFileRelativePath = path.relative(process.cwd(), mainFilePath);
  console.log(`Creating main file at: ${mainFileRelativePath}`);
  try {
    const templateData = await fs.readFile(templatePath, 'utf-8');
    await fs.writeFile(mainFilePath, templateData);
  } catch (error) {
    console.error('Error creating main file:', error);
  }

  console.log('Initialization complete.');
}

init(process.argv[2]).catch((error) => {
  console.error('Error during initialization:', error);
});