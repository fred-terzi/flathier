// src/commands/addObject.js
import generateUniqueId from '../utils/generateUniqueId.js';
import computeOutlines from '../utils/computeOutlines.js';
import getCustomExt from '../utils/getCustomExt.js';

/**
 * Inserts a new object immediately after the item with the specified outline number,
 * assigns unique IDs to all custom extension _ID fields, and recomputes outlines for the entire list.
 *
 * @async
 * @param {Array<Object>} data - The array of objects to modify.
 * @param {string} outlineNumber - The outline number of the item after which to insert the new object.
 * @param {Object} newObject - The new object to insert (already constructed from template).
 * @returns {Promise<Array<Object>>} - The modified array with the new object inserted.
 * @throws {Error} - Throws an error if the outline number is invalid.
 */
export default async function addObject(data, outlineNumber, newObject) {
  let customExt;
  try {
    customExt = await getCustomExt();
    customExt = (typeof customExt === 'string') ? customExt.trim() : String(customExt || '').trim();
    if (!customExt) {
      throw new Error('Custom extension is not defined or invalid.');
    }
  } catch (err) {
    throw new Error(`Failed to load custom extension: ${err.message}`);
  }

  // 1. Find the selected index based on the outline number
  const selectedIndex = data.findIndex(item => item.outline === outlineNumber);

  if (selectedIndex === -1) {
    console.error(
      `⚠️  No item found with outline number: ${outlineNumber}. Please provide a valid outline number.`
    );
    return;
  }

  // 2. Prepare new object (already constructed from template)
  const parentHier = data[selectedIndex].hier;
  newObject.hier = parentHier; // inherit parent's hierarchy
  newObject.outline = 'pending'; // placeholder until computeOutlines runs

  // Generalize _ID assignment using custom extension
  if (!customExt) {
    throw new Error('Custom extension is not defined or invalid.');
  }

  // Assign unique IDs to all matching _ID fields
  await assignCustomIds(newObject, customExt);

  // 3. Insert and update selection
  const insertPos = selectedIndex + 1;
  data.splice(insertPos, 0, newObject);

  // 4. Recompute outlines for the entire data array
  computeOutlines(data);

  return data;
}

/**
 * Assigns a generated unique ID to the field in the object that matches the custom extension _ID pattern (case-sensitive, exact match).
 *
 * @async
 * @param {Object} obj - The object to update.
 * @param {string} customExt - The custom extension string (e.g., '.fhr').
 * @returns {Promise<void>} - Resolves when the matching field has been updated.
 */
async function assignCustomIds(obj, customExt) {
  const extNoDot = customExt.startsWith('.') ? customExt.slice(1) : customExt;
  const idField = `${extNoDot}_ID`;
  if (Object.prototype.hasOwnProperty.call(obj, idField)) {
    obj[idField] = await generateUniqueId();
  }
}
