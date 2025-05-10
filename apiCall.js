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
}

main();