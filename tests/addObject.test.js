import addObject from '../src/core/addObject.js';

async function runAddObjectTest() {
  // Prepare mock data: a simple hierarchy with one root item
  let data = [
    {
      title: 'Root',
      outline: '0',
      hier: '0',
      test_ID: 'root-id'
    }
  ];

  // Add a new object after the first item (outline '0')
  const newTitle = 'Added by addObject test';
  const outlineNumber = '0';
  // Construct a new object with a generic _ID field
  const newObject = { title: newTitle, test_ID: '' };
  try {
    const updatedData = await addObject(data, outlineNumber, newObject);
    console.log('Updated data after addObject:', JSON.stringify(updatedData, null, 2));
    if (!Array.isArray(updatedData)) throw new Error('addObject did not return an array');
    const found = updatedData.find(item => item.title === newTitle);
    if (!found) throw new Error('New object not found in data after addObject');
    console.log('Newly added object:', JSON.stringify(found, null, 2));
    // Check that any _ID field is present and non-empty
    const idField = Object.keys(found).find(k => k.endsWith('_ID'));
    if (!idField || !found[idField]) throw new Error('New object missing _ID field or value');
    if (found.outline === 'pending') throw new Error('New object outline not computed');
    console.log('addObject() test passed: New object added with _ID field and outline computed.');
  } catch (err) {
    console.error('addObject() test failed:', err.message);
    return;
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runAddObjectTest();
}
