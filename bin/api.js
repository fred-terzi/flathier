
import init from '../src/commands/init.js';
import { loadData, saveData, getDataPath } from '../src/dataHandler.js';

const flathier = {
  init,
  loadData,
  saveData,
  getDataPath
};

export default flathier;

console.log('Hello from the API!');