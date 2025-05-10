// src/commands/deleteObject.js
import { computeOutlines } from '../utils/computeOutlines.js';
import { exitWithoutClear } from '../utils/exitWithoutClear.js';
/**
 * Deletes the object with the given outline number, updates the selection,
 * and recomputes outlines for the remaining items.
 *
 * @param {Array<Object>} data - The flat-array representation of your tree.
 * @param {string} outlineNumber - The outline number of the item to delete.
 * @returns {{ data: Array<Object>, selectedIndex: number|null } | void}
 */
export function deleteObject(data, outlineNumber) {
  // Add a condition to prevent deletion if there are only two objects left
  if (data.length <= 2) {
    console.error('⚠️  Cannot delete items when only two objects remain in the data.');
    exitWithoutClear();
  }

  // Find the index of the object with the given outline number
  const selectedIndex = data.findIndex(item => item.outline === outlineNumber);

  if (selectedIndex === -1) {
    console.error(
      `⚠️  No item found with outline number: ${outlineNumber}. Please provide a valid outline number.`
    );
    return;
  }

  // Remove the selected item
  data.splice(selectedIndex, 1);

  // Recompute outlines for the entire data array
  computeOutlines(data);

  const newSelectedIndex = data.length > 0 ? Math.min(data.length - 1, selectedIndex) : null;

  return { data, selectedIndex: newSelectedIndex };
}
