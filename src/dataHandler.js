import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedData = null;
let cachedFilePath = null;

/**
 * Finds the root directory of the project by locating the nearest package.json file.
 * @param {string} [start=__dirname] - The directory to start searching from.
 * @returns {Promise<string>} The root directory path.
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
      if (parent === dir) throw new Error('package.json not found');
      dir = parent;
    }
  }
}

/**
 * Finds the .fhr.json file in the root directory.
 * @returns {Promise<string>} The path to the .fhr.json file.
 * @throws Will throw an error if no such file is found.
 */
async function findFhrFile() {
  if (cachedFilePath) return cachedFilePath;

  const root = await findProjectRoot();
  const files = await fs.readdir(root);
  const fhrFile = files.find(f => f.endsWith('.fhr.json'));
  if (!fhrFile) {
    console.warn('No .fhr.json file found in root directory.');
    return null;
  }

  cachedFilePath = path.join(root, fhrFile);
  return cachedFilePath;
}

/**
 * Loads the .fhr.json file into memory and caches its content.
 * This must be called before using getData().
 * @returns {Promise<Object|Array>} The parsed JSON data.
 */
export async function loadData() {
  const filePath = await findFhrFile();
  if (!filePath) {
    throw new Error('No .fhr.json file found in the root directory.');
  }
  const raw = await fs.readFile(filePath, 'utf-8');
  cachedData = JSON.parse(raw);
  return cachedData;
}

/**
 * Gets the in-memory copy of the data.
 * Must call loadData() before using this function.
 * @returns {Object|Array} The in-memory JSON data.
 * @throws Will throw an error if data has not been loaded yet.
 */
export function getData() {
  if (!cachedData) throw new Error('Data not loaded. Call loadData() first.');
  return cachedData;
}

/**
 * Replaces the in-memory copy of the data.
 * This does not persist to disk until saveData() is called.
 * @param {Object|Array} newData - The new data to cache.
 */
export function setData(newData) {
  cachedData = newData;
}

/**
 * Writes the in-memory data back to the .fhr.json file.
 * @returns {Promise<void>}
 * @throws Will throw if data or file path has not been initialized.
 */
export async function saveData() {
  if (!cachedData || !cachedFilePath) {
    throw new Error('No data or file path to save.');
  }
  const json = JSON.stringify(cachedData, null, 2);
  await fs.writeFile(cachedFilePath, json, 'utf-8');
}

/**
 * Reloads the .fhr.json file from disk, replacing the in-memory cache.
 * @returns {Promise<Object|Array>} The freshly loaded data.
 */
export async function refreshData() {
  return await loadData();
}
