// Core functions
import addObject from '../src/core/addObject.js';
import deleteObject from '../src/core/deleteObject.js';
import demote from '../src/core/demote.js';
import promote from '../src/core/promote.js';
import moveDown from '../src/core/moveDown.js';
import moveUp from '../src/core/moveUp.js';
import createAsciiTree from '../src/core/asciiTree.js';

// Utility functions
import editTitle from '../src/utils/editTitle.js';
import computeOutlines from '../src/utils/computeOutlines.js';
import generateUniqueId from '../src/utils/generateUniqueId.js';
import buildTree from '../src/utils/buildTree.js';
import flattenTree from '../src/utils/flattenTree.js';

const flathier = {
  addObject,
  deleteObject,
  demote,
  promote,
  moveDown,
  moveUp,
  createAsciiTree,
  editTitle,
  generateUniqueId,
  computeOutlines,
  buildTree,
  flattenTree,
};

export default flathier;

