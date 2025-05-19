import moveUp from '../src/core/moveUp.js';

async function runMoveUpTest() {
  // Use mock data: Root -> First Item, Second Item
  const data = [
    { outline: '0', hier: 0, title: 'Root' },
    { outline: '0.1', hier: 1, title: 'First Item' },
    { outline: '0.2', hier: 1, title: 'Second Item' }
  ];

  // Move the second item up (should swap with the first)
  const movedData = moveUp(data, '0.2');

  // Find the new positions after moveUp
  const firstIdx = movedData.findIndex(item => item.title === 'First Item');
  const secondIdx = movedData.findIndex(item => item.title === 'Second Item');
  if (secondIdx !== firstIdx - 1) {
    console.error('moveUp() test failed: Second item did not move up (by title order).');
    return;
  }
  // Check that outlines are recomputed and unique
  const outlines = movedData.map(item => item.outline);
  const uniqueOutlines = new Set(outlines);
  if (outlines.length !== uniqueOutlines.size) {
    console.error('moveUp() test failed: Outlines are not unique after move.');
    return;
  }
  // Check that both items are still present
  if (!movedData.find(item => item.title === 'First Item') || !movedData.find(item => item.title === 'Second Item')) {
    console.error('moveUp() test failed: One of the items is missing after move.');
    return;
  }
  // Check that the moved item still has the correct title
  if (movedData[firstIdx].title !== 'First Item' || movedData[secondIdx].title !== 'Second Item') {
    console.error('moveUp() test failed: Titles do not match expected order after move.');
    return;
  }
  console.log('moveUp() test passed: Item was moved up and outlines recomputed, verified by title order.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runMoveUpTest();
}
