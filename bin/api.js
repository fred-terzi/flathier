
import init from '../src/commands/init.js';
import addObject from '../src/core/addObject.js';

// Data handling functions
import { loadData, saveData  } from '../src/dataHandler.js';

const flathier = {
  init,
  loadData,
  saveData,
  addObject
};

export default flathier;

console.log('Hello from the API!');