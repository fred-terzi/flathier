import deleteObject from '../src/core/deleteObject.js';

async function runDeleteObjectTest() {
  // Use mock data with 'outline' and 'hier' fields
  const data = [
    { outline: '0', hier: 0, title: 'Root' },
    { outline: '0.1', hier: 1, title: 'To Delete' },
    { outline: '0.2', hier: 1, title: 'Keep Me' }
  ];

  // Delete the object by outline number
  const newData = deleteObject(data, '0.1');

  // Check that the item is deleted (by title)
  if (newData.find(item => item.title === 'To Delete')) {
    console.error('deleteObject() test failed: Object with deleted title still exists.');
    return;
  }
  // Check that other items remain (by title)
  if (!newData.find(item => item.title === 'Root') || !newData.find(item => item.title === 'Keep Me')) {
    console.error('deleteObject() test failed: Other items were incorrectly deleted.');
    return;
  }
  console.log('deleteObject() test passed: Object deleted by outline number and others remain.');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runDeleteObjectTest();
}
