import promote from '../src/core/promote.js';

async function runPromoteTest() {
  // Use mock data: Root -> First Item, Second Item; First Item -> Child of First
  const data = [
    { outline: '0', hier: 0, title: 'Root' },
    { outline: '0.1', hier: 1, title: 'First Item' },
    { outline: '0.1.1', hier: 2, title: 'Child of First' },
    { outline: '0.2', hier: 1, title: 'Second Item' }
  ];

  // Promote 'Child of First' (should become a sibling of 'First Item', after it)
  const promotedData = promote(data, '0.1.1');

  // Find the promoted node and its former parent
  const promoted = promotedData.find(item => item.title === 'Child of First');
  const parent = promotedData.find(item => item.title === 'First Item');

  if (!promoted || !parent) {
    console.error('promote() test failed: Promoted or parent item missing after promote.');
    return;
  }
  // The promoted child should now be a sibling of its parent (same outline depth)
  if (promoted.outline.split('.').length !== parent.outline.split('.').length) {
    console.error('promote() test failed: Promoted child is not at the correct hierarchy level.');
    return;
  }
  // The promoted child should come immediately after its parent
  const parentIdx = promotedData.findIndex(item => item.title === 'First Item');
  const promotedIdx = promotedData.findIndex(item => item.title === 'Child of First');
  if (promotedIdx !== parentIdx + 1) {
    console.error('promote() test failed: Promoted child is not immediately after its parent.');
    return;
  }
  console.log('promote() test passed: Child was promoted to be a sibling of its parent, verified by title and outline.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runPromoteTest();
}
