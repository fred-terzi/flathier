import addObject from '../src/core/addObject.js';
import deleteObject from '../src/core/deleteObject.js';
import demote from '../src/core/demote.js';
import moveDown from '../src/core/moveDown.js';
import moveUp from '../src/core/moveUp.js';
import promote from '../src/core/promote.js';

const flathier = {
  addObject,
  deleteObject,
  demote,
  moveDown,
  moveUp,
  promote,
};

export default flathier;

console.log('Hello from the API!');