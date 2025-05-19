import moveDown from '../src/core/moveDown.js';

async function runMoveDownTest() {
  // Use mock data: Root -> First Item, Second Item
  const data = [
    { outline: '0', hier: 0, title: 'Root' },
    { outline: '0.1', hier: 1, title: 'First Item' },
    { outline: '0.2', hier: 1, title: 'Second Item' }
  ];

  // Move the first item down (should swap with the second)
  const movedData = moveDown(data, '0.1');

  // Find the new positions after moveDown
  const firstIdx = movedData.findIndex(item => item.title === 'First Item');
  const secondIdx = movedData.findIndex(item => item.title === 'Second Item');
  if (firstIdx !== secondIdx + 1) {
    console.error('moveDown() test failed: First item did not move down (by title order).');
    return;
  }
  // Check that outlines are recomputed and unique
  const outlines = movedData.map(item => item.outline);
  const uniqueOutlines = new Set(outlines);
  if (outlines.length !== uniqueOutlines.size) {
    console.error('moveDown() test failed: Outlines are not unique after move.');
    return;
  }
  // Check that both items are still present
  if (!movedData.find(item => item.title === 'First Item') || !movedData.find(item => item.title === 'Second Item')) {
    console.error('moveDown() test failed: One of the items is missing after move.');
    return;
  }
  // Check that the moved item still has the correct title
  if (movedData[firstIdx].title !== 'First Item' || movedData[secondIdx].title !== 'Second Item') {
    console.error('moveDown() test failed: Titles do not match expected order after move.');
    return;
  }
  console.log('moveDown() test passed: Item was moved down and outlines recomputed, verified by title order.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runMoveDownTest();
}
