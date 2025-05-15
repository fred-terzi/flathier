// src/commands/deleteObject.js

import computeOutlines from '../utils/computeOutlines.js';

/**
 * Deletes the object with the given outline number, finds the item by outline,
 * and deletes it. Updates the selection and recomputes outlines
 * for the remaining items.
 *
 * @param {Array<Object>} data - The flat-array representation of your tree.
 * @param {number} outlineNumber - The outline number of the item to delete.
 * @returns {Array<Object>|void}
 */
export default function deleteObject(data, outlineNumber) {
  // Find the index of the item with the given outline number
  const idx = data.findIndex(item => String(item.outline) === String(outlineNumber));
  if (idx === -1) {
    console.error(`⚠️  No item found with outline: ${outlineNumber}. Please provide a valid outline number.`);
    return;
  }
  data.splice(idx, 1);
  computeOutlines(data);
  return data;
}
