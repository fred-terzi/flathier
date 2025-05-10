// Set the FHR_ROOT_DIR environment variable
process.env.FHR_ROOT_DIR = process.cwd(); // Sets it to the current working directory

import flathier from './bin/api.js';

const projectName = "Test 1";

async function main() {
  try {
    // Call the init function and wait for it to complete
    await flathier.init(projectName);

    // Load the data after init is complete
    const data = await flathier.loadData();
    console.log('Loaded data:', data);
  } catch (err) {
    console.error('Error:', err);
  }

    /**
     * @function addObject
     * @description Adds a new object to the data array at the end of the json file. The new object is copied from the last object in the .fhr/<projectName>.fhr.json file.
     * @param {Array<Object>} data - The flat-array representation of your tree.
     * @param {string} outlineNumber - The outline number of the item after which to insert.
     * @returns {{ data: Array<Object>, selectedIndex: number } | void}
     */

    // 1. Find the last item in the data array
    const lastItem = data[data.length - 1];
    await flathier.addObject(data, getLastItemOutline(data));
}

main();