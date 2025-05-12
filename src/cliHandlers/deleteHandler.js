import fhr from 'flathier';

/**
 * Handles the deletion of an item from the data.
 * @param {Array} data - The current data array.
 * @param {number} selectedIndex - The index of the currently selected item.
 * @returns {Promise<{data: Array, tree: Array}>} - The updated data and tree.
 */
export async function handleDeleteItem(data, selectedIndex) {
  // Check if there are only two items in the data
  if (data.length <= 2) {
    const errorMessage = '❌ Cannot delete: Only two items left.';
    const tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);
    return { data, tree, errorMessage };
  }
  if (data[selectedIndex + 1]) {
    const outline = data[selectedIndex + 1].outline;
    console.log('Deleting item with outline:', outline);
    data = await fhr.deleteObject(data, outline);
    await fhr.saveData(data);
    const tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);
    return { data, tree };
  } else {
    console.error('❌ Cannot delete: No item exists at the selected index.');
    return { data, tree: await fhr.createAsciiTree(data, ['title', 'unique_id']) };
  }
}