import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine root directory dynamically based on an environment variable or fallback to default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = process.env.FHR_ROOT_DIR || path.resolve(__dirname, '../../');

/**
 * Finds the first .fhr.json file in the project root directory.
 * @returns {Promise<string>} The resolved path to the .fhr.json file.
 * @throws {Error} If no such file is found.
 */
async function findFhrFile() {
  const files = await fs.readdir(ROOT_DIR);
  const fhrFile = files.find((f) => f.endsWith('.fhr.json'));
  if (!fhrFile) {
    throw new Error('No .fhr.json file found in root directory.');
  }
  return path.join(ROOT_DIR, fhrFile);
}

/**
 * Loads and parses the .fhr.json file.
 * @returns {Promise<Array>} Parsed flat array from the JSON file.
 */
export async function loadData() {
  const filePath = await findFhrFile();
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Saves data to the .fhr.json file.
 * @param {Array} data - Flat array of objects to write.
 */
export async function saveData(data) {
  const filePath = await findFhrFile();
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, json, 'utf-8');
}

/**
 * Gets the current path to the .fhr.json file.
 * @returns {Promise<string>} The path to the file.
 */
export async function getDataPath() {
  return await findFhrFile();
}
