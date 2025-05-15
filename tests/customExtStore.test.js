import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';

async function runCustomExtStoreTest() {
  const testExt = '.testcustom';
  const extNoDot = testExt.slice(1);
  const folderPath = path.join(process.cwd(), `.${extNoDot}`);
  const customExtStorePath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    '../src/fhrTemplates/customExtStore.json'
  );

  // Clean up before test
  try { await fs.rm(folderPath, { recursive: true, force: true }); } catch {}
  try { await fs.unlink(customExtStorePath); } catch {}

  // Run init with custom extension
  await init('CustomExtStoreTest', "teststring");

  // Read customExtStore.json
  let store;
  try {
    const raw = await fs.readFile(customExtStorePath, 'utf-8');
    store = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read customExtStore.json:', err.message);
    process.exit(1);
  }

  // Check that the custom extension is saved as the current value (using 'customExt' key)
  if (!store || typeof store !== 'object' || store.customExt !== testExt) {
    console.error('customExtStore.json does not contain the expected custom extension:', store);
    process.exit(1);
  }
  console.log('Custom extension was saved correctly in customExtStore.json:', store);
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runCustomExtStoreTest();
}
