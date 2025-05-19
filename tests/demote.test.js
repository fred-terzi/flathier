import demote from '../src/core/demote.js';

async function runDemoteTest() {
  // Use mock data: Root -> First Child, Second Child
  const data = [
    { outline: '0', hier: 0, title: 'Root' },
    { outline: '0.1', hier: 1, title: 'First Child' },
    { outline: '0.2', hier: 1, title: 'Second Child' }
  ];

  // Demote the second child (should become a child of the first)
  const demotedData = demote(data, '0.2');

  // Find the demoted node and its new parent
  const demoted = demotedData.find(item => item.title === 'Second Child');
  const newParent = demotedData.find(item => item.title === 'First Child');

  // Check that the demoted node exists and has a parent
  if (!demoted || !newParent) {
    console.error('demote() test failed: Could not find demoted or parent node.');
    return;
  }
  // Check that the demoted node's hier is one level deeper than its new parent
  const demotedHier = parseInt(demoted.hier, 10);
  const parentHier = parseInt(newParent.hier, 10);
  if (demotedHier !== parentHier + 1) {
    console.error('demote() test failed: Demoted node is not one level deeper than its new parent.');
    return;
  }
  // Check that the demoted node's outline starts with its new parent's outline
  if (!demoted.outline.startsWith(newParent.outline + '.')) {
    console.error('demote() test failed: Demoted node outline does not start with parent outline.');
    return;
  }
  console.log('demote() test passed: Node was demoted to be a child of its previous sibling.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runDemoteTest();
}
