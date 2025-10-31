import buildTree from '../src/utils/buildTree.js';

async function runBuildTreeTest() {
  // Prepare mock data: a simple flat list of items
  const items = [
    { outline: '1', title: 'Root 1' },
    { outline: '1.1', title: 'Child 1.1' },
    { outline: '2', title: 'Root 2' }
  ];

  try {
    const { roots, nodeMap } = buildTree(items);

    console.log('Roots:', JSON.stringify(roots, null, 2));
    console.log('Node Map:', JSON.stringify(nodeMap, null, 2));

    if (!Array.isArray(roots)) throw new Error('Roots is not an array');
    if (typeof nodeMap !== 'object') throw new Error('Node map is not an object');

    if (roots.length !== 2) throw new Error('Incorrect number of root nodes');
    if (!nodeMap['1'] || !nodeMap['2']) throw new Error('Missing root nodes in node map');

    console.log('buildTree() test passed: Tree structure and node map are correct.');
  } catch (err) {
    console.error('buildTree() test failed:', err.message);
    return;
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runBuildTreeTest();
}