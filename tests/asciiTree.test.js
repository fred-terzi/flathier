import createAsciiTree from '../src/core/asciiTree.js';

async function runAsciiTreeTest() {
  // Use mock data instead of file system or external functions
  const data = [
    { outline: '0', title: 'TestProject' },
    { outline: '0.1', title: 'First Item' },
    { outline: '0.2', title: 'Second Item' },
    { outline: '0.1.1', title: 'Child of First' }
  ];

  // Prepare fields to include in the ASCII tree
  const fieldsToInclude = ['title'];

  // Generate the ASCII tree (returns Array<string>, each row with a newline)
  const treeRows = await createAsciiTree(data, fieldsToInclude);

  // Print the ASCII tree
  console.log('ASCII Tree Output:\n' + treeRows.join(''));

  // Basic checks
  if (!Array.isArray(treeRows) || treeRows.length === 0) {
    console.error('asciiTree() test failed: Output is empty or not an array.');
    return;
  }
  if (!treeRows.every(row => typeof row === 'string' && row.endsWith('\n'))) {
    console.error('asciiTree() test failed: Not all rows are strings ending with a newline.');
    return;
  }
  if (!treeRows.some(row => row.includes('First Item')) || !treeRows.some(row => row.includes('Child of First'))) {
    console.error('asciiTree() test failed: Output missing expected titles.');
    return;
  }
  if (!treeRows[0].includes('TestProject')) {
    console.error('asciiTree() test failed: Root node missing or not first.');
    return;
  }
  if (!treeRows.some(row => row.includes('├──') || row.includes('└──'))) {
    console.error('asciiTree() test failed: Output missing ASCII tree connector symbols.');
    return;
  }
  console.log('asciiTree() test passed: Output contains expected structure, titles, and formatting.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runAsciiTreeTest();
}
