// src/commands/deleteObject.js

import computeOutlines from '../utils/computeOutlines.js';
import getCustomExt from '../utils/getCustomExt.js';

/**
 * Deletes the object with the given custom ID field value, updates the selection,
 * and recomputes outlines for the remaining items.
 *
 * @param {Array<Object>} data - The flat-array representation of your tree.
 * @param {string} idValue - The value of the custom ID field of the item to delete.
 * @returns {Array<Object>|void}
 */
export default function deleteObject(data, idValue) {
  // Dynamically determine the custom ID field
  let customExt = getCustomExt.sync ? getCustomExt.sync() : undefined;
  if (!customExt) {
    // fallback to .fhr
    customExt = '.fhr';
  }
  const extNoDot = customExt.startsWith('.') ? customExt.slice(1) : customExt;
  const idField = `${extNoDot}_ID`;

  // Find the index of the object with the given custom ID value
  const selectedIndex = data.findIndex(item => item[idField] === idValue);

  if (selectedIndex === -1) {
    console.error(
      `⚠️  No item found with custom ID value: ${idValue}. Please provide a valid custom ID value.`
    );
    return;
  }

  // Remove the selected item
  data.splice(selectedIndex, 1);

  // Recompute outlines for the entire data array
  computeOutlines(data);

  return data;
}
