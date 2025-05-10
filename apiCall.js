// Set the FHR_ROOT_DIR environment variable
process.env.FHR_ROOT_DIR = process.cwd(); // Sets it to the current working directory

import flathier from './bin/api.js';

const projectName = "Test 1";

async function main() {
  let data; // Declare data in a broader scope
  try {
    // Call the init function and wait for it to complete
    await flathier.init(projectName);

    // Load the data after init is complete
    data = await flathier.loadData();
    console.log('Loaded data:', data);

    // Add a new object to the data
    data = await flathier.addObject(data, await flathier.getLastItemOutline(data));
    console.log('Data after adding object:', data);
  } catch (err) {
    console.error('Error:', err);
  }
  // Delete object with outline 1
  await flathier.deleteObject(data, '1');
  console.log('Data after deleting object:', data);
}

main();