
import init from '../src/commands/init.js';
import { loadData, saveData  } from '../src/dataHandler.js';

const flathier = {
  init,
  loadData,
  saveData
};

export default flathier;

console.log('Hello from the API!');