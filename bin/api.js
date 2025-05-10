
import init from '../src/commands/init.js';
import addObject from '../src/core/addObject.js';
import deleteObject from '../src/core/deleteObject.js';
import demote from '../src/core/demote.js';

// Data handling functions
import { loadData, saveData  } from '../src/dataHandler.js';

// Utility functions
import getLastItemOutline from '../src/utils/getLastItemOutline.js';
import getLastTemplateObject from '../src/utils/getItemTemplate.js';

const flathier = {
  init,
  loadData,
  saveData,
  addObject,
  getLastItemOutline,
  getLastTemplateObject,
  deleteObject,
  demote
};

export default flathier;

console.log('Hello from the API!');