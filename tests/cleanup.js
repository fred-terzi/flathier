// cleanup.js - Remove test folders/files created by tests/init.test.js
import fs from 'fs/promises';
import path from 'path';

async function cleanTestArtifacts() {
  const testExts = ['.testfhr', '.fhr'];
  for (const testExt of testExts) {
    const extNoDot = testExt.slice(1);
    const folderPath = path.join(process.cwd(), `.${extNoDot}`);
    try {
      await fs.rm(folderPath, { recursive: true, force: true });
      console.log(`Removed test folder: ${folderPath}`);
    } catch (err) {
      console.log(`No test folder to remove: ${folderPath}`);
    }
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  cleanTestArtifacts();
}
