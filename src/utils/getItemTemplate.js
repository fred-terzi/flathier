import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import getCustomExt from './getCustomExt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/**
 * Loads the template for the last item, using the correct custom extension and folder.
 * @param {string} [customExt] - The custom extension (with leading dot, e.g., '.fhr').
 * @returns {Promise<Object|null>} The template object or null if not found.
 */
export default async function getLastTemplateObject(customExt) {
  // Always use getCustomExt to ensure correct extension
  if (!customExt) {
    customExt = await getCustomExt();
  }
  customExt = (typeof customExt === 'string') ? customExt.trim() : String(customExt || '').trim();
  if (!customExt.startsWith('.')) customExt = `.${customExt}`;
  const extNoDot = customExt.slice(1);
  const extWithJson = `${extNoDot}.json`;
  const folderPath = path.join(__dirname, `../fhrTemplates`);
  const projectFolderPath = path.join(process.cwd(), `.${extNoDot}`);
  let templatePath = path.join(projectFolderPath, `template.${extWithJson}`);

  // Prefer project folder, fallback to built-in template
  let templateArray = null;
  try {
    const raw = await fs.readFile(templatePath, 'utf-8');
    templateArray = JSON.parse(raw);
  } catch {
    // fallback to built-in
    templatePath = path.join(folderPath, 'fhrTemplate.json');
    try {
      const raw = await fs.readFile(templatePath, 'utf-8');
      templateArray = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (!Array.isArray(templateArray) || templateArray.length === 0) return null;
  return templateArray[templateArray.length - 1];
}