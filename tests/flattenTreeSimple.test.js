import flattenTree from '../src/utils/flattenTree.js';

async function runFlattenTreeTest() {
  // Prepare mock data: a simple tree structure
  const roots = [
    {
      outline: '0',
      title: 'Root 1',
      children: [
        { outline: '0.1', title: 'Child 1.1', children: [] }
      ]
    },
    {
      outline: '1',
      title: 'Root 2',
      children: []
    }
  ];

  try {
    const flattened = flattenTree(roots);

    console.log('Flattened Tree:', JSON.stringify(flattened, null, 2));

    if (!Array.isArray(flattened)) throw new Error('Flattened result is not an array');
    if (flattened.length !== 3) throw new Error('Incorrect number of nodes in flattened tree');

    const root1 = flattened.find(node => node.outline === '0');
    const child1 = flattened.find(node => node.outline === '0.1');
    const root2 = flattened.find(node => node.outline === '1');

    if (!root1 || !child1 || !root2) throw new Error('Missing nodes in flattened tree');

    if (root1.hier !== 0 || child1.hier !== 1 || root2.hier !== 0) {
      throw new Error('Incorrect hier values in flattened tree');
    }

    console.log('flattenTree() test passed: Flattened array is correct.');
  } catch (err) {
    console.error('flattenTree() test failed:', err.message);
    return;
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runFlattenTreeTest();
}