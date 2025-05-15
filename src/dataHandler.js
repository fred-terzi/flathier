import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import getCustomExt from './utils/getCustomExt.js'; // Helper to get customExt from customExtStore.json

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

let cachedData     = null;
let cachedFilePath = null;
let hasWarned      = false;

/**
 * Finds the root directory of the project by locating the nearest package.json file.
 * Starts at process.cwd(), so root is where the user ran `fhr`, not where this module lives.
 */
async function findProjectRoot(start = process.cwd()) {
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
 * Finds the main project file by using the config file if available, otherwise falls back to custom extension logic.
 */
async function findFhrFile() {
  if (cachedFilePath) return cachedFilePath;

  const root = await findProjectRoot();    // starts at process.cwd()
  // Try to use config file if it exists
  const configPath = path.join(root, '.reqt', 'config.reqt.json');
  try {
    const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
    if (config.filepath) {
      const absPath = path.resolve(root, config.filepath);
      await fs.access(absPath); // throws if not found
      cachedFilePath = absPath;
      return cachedFilePath;
    }
  } catch {
    // ignore, fallback to old logic
  }
  // Fallback: use custom extension logic
  const customExt = await getCustomExt();
  const extNoDot = customExt.startsWith('.') ? customExt.slice(1) : customExt;
  const extWithJson = extNoDot.endsWith('.json') ? extNoDot : `${extNoDot}.json`;
  const folderPath = path.join(root, `.${extNoDot}`);

  // Look for any *.<customExt>.json file in the correct subfolder
  let files = [];
  try {
    files = await fs.readdir(folderPath);
  } catch {
    throw new Error(`Data folder not found: ${folderPath}`);
  }
  const fhrFile = files.find(f => f.endsWith(`.${extWithJson}`));
  if (!fhrFile) {
    throw new Error(`No main project file found in ${folderPath} with extension .${extWithJson}`);
  }
  cachedFilePath = path.join(folderPath, fhrFile);
  return cachedFilePath;
}

export async function loadData() {
  const filePath = await findFhrFile();

  const raw = await fs.readFile(filePath, 'utf-8');
  cachedData     = JSON.parse(raw);
  cachedFilePath = filePath;
  return cachedData;
}

export function getData() {
  if (!cachedData) throw new Error('Data not loaded. Call loadData() first.');
  return cachedData;
}

export function setData(newData) {
  cachedData = newData;
}

export async function saveData() {
  if (!cachedData || !cachedFilePath) {
    throw new Error('No data or file path to save.');
  }
  const json = JSON.stringify(cachedData, null, 2);
  await fs.writeFile(cachedFilePath, json, 'utf-8');
}

export async function refreshData() {
  return await loadData();
}
