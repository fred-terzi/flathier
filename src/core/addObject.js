// src/commands/addObject.js
import crypto from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { generateUniqueId } from '../utils/generateUniqueId.js';
import { computeOutlines } from '../utils/computeOutlines.js';

// ──────────────────────────────────────────────────────────
// Load template JSON via fs to avoid the experimental JSON-module warning
// ──────────────────────────────────────────────────────────
const __filename   = fileURLToPath(import.meta.url);
const __dirname    = dirname(__filename);
const templatePath = resolve(__dirname, '../../templates/newObjectTemplate.json');

let template;
try {
  const raw = fs.readFileSync(templatePath, 'utf8');
  template  = JSON.parse(raw);
} catch (err) {
  throw new Error(`Failed to load template at ${templatePath}: ${err.message}`);
}

/**
 * Inserts a new object immediately after the item with the specified outline number,
 * assigns it a UUID, and recomputes outlines for the entire list.
 *
 * @param {Array<Object>} data - The flat-array representation of your tree.
 * @param {string} outlineNumber - The outline number of the item after which to insert.
 * @returns {{ data: Array<Object>, selectedIndex: number } | void}
 */
export function addObject(data, outlineNumber) {
  // 1. Find the selected index based on the outline number
  const selectedIndex = data.findIndex(item => item.outline === outlineNumber);

  if (selectedIndex === -1) {
    console.error(
      `⚠️  No item found with outline number: ${outlineNumber}. Please provide a valid outline number.`
    );
    return;
  }

  // 2. Prepare new object based on external template
  const parentHier = data[selectedIndex].hier;
  const newObject = {
    ...template,                      // load defaults from JSON
    unique_id: '',                    // placeholder for unique ID
    hier: parentHier,                 // inherit parent's hierarchy
    outline: 'pending'                // placeholder until computeOutlines runs
  };
  const uniqueId = generateUniqueId();
  newObject.unique_id = uniqueId;

  // 3. Insert and update selection
  const insertPos = selectedIndex + 1;
  data.splice(insertPos, 0, newObject);
  const newSelectedIndex = insertPos;

  // 4. Recompute outlines for the entire data array
  computeOutlines(data);

  return { data, selectedIndex: newSelectedIndex };
}
