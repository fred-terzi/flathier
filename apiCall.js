// Set the FHR_ROOT_DIR environment variable
process.env.FHR_ROOT_DIR = process.cwd(); // Sets it to the current working directory

import fhr from 'flathier';
import {renderToConsole} from './src/renderers/consoleRenderer.js';

const projectName = "Test 1";

async function main() {
  let data; // Declare data in a broader scope
  try {
    // Call the init function and wait for it to complete
    await fhr.init(projectName);

    // Load the data after init is complete
    data = await fhr.loadData();
    console.log('Loaded data:', data);

    // Add a new object to the data
    data = await fhr.addObject(data, await fhr.getLastItemOutline(data));
    console.log('Data after adding object:', data);
  } catch (err) {
    console.error('Error:', err);
  }

  // Demote object with outline 2
  const outlineToDemote = '2';
  data = await fhr.demote(data, outlineToDemote);
  console.log('Data after demoting object:', data);

  // Add a new item under 1
  data = await fhr.addObject(data, '1');
  console.log('Data after adding object under 1:', data);



  // Move up item 2
  data = await fhr.moveUp(data, '2');
  console.log(`Data after move up`, data);

  // Move down item 1
  data = await fhr.moveDown(data, '1');
  console.log(`Data after move down`, data);

    // Delete object with outline 1
    await fhr.deleteObject(data, '1');
    console.log('Data after deleting object:', data);

    // Call the createAsciiTree function

    // Create a list of fields to include in the ASCII tree titles
    const fieldsToInclude = ['title', 'unique_id'];
    const asciiTree = await fhr.createAsciiTree(data, fieldsToInclude);
    console.log('ASCII Tree:', asciiTree);

}


main();