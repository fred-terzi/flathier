import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';

// Run testClean at the start
async function runTestClean() {
  try {
    await import('./cleanup.js');
  } catch (e) {
    // ignore if cleanup.js does not exist or fails
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function runInitTest() {
  await runTestClean(); // Clean up before test

  const testRoot = process.cwd();
  const testExt = '.testfhr';
  const testFileName = 'TestProject';
  const extNoDot = testExt.slice(1);
  const extWithJson = `${extNoDot}.json`;
  const folderPath = path.join(testRoot, `.${extNoDot}`);
  const mainFileName = `${testFileName}.${extWithJson}`;
  const mainFilePath = path.join(folderPath, mainFileName);
  const configPath = path.join(folderPath, `config.${extWithJson}`);
  const templatePath = path.join(folderPath, `template.${extWithJson}`);

  // Clean up before test
  try { await fs.rm(folderPath, { recursive: true, force: true }); } catch {}

  // Run init
  await init(testFileName, testExt);

  // Check that files exist
  const mainExists = await fileExists(mainFilePath);
  const configExists = await fileExists(configPath);
  const templateExists = await fileExists(templatePath);

  // Read config and check filepath
  let configFileCorrect = false;
  if (configExists) {
    const configData = await fs.readFile(configPath, 'utf-8');
    const configJson = JSON.parse(configData);
    configFileCorrect = configJson.filepath === `./.${extNoDot}/${mainFileName}`;
  }

  // Output results with details
  if (mainExists && configExists && templateExists && configFileCorrect) {
    console.log('init() test passed: All files created in the new folder and config filepath is correct.');
  } else {
    console.error('init() test failed:');
    if (!mainExists) console.error('  Main file missing:', mainFilePath);
    if (!configExists) console.error('  Config file missing:', configPath);
    if (!templateExists) console.error('  Template file missing:', templatePath);
    if (!configFileCorrect) console.error('  Config filepath incorrect.');
  }

  // Print file contents for verification
  if (mainExists) {
    const mainData = await fs.readFile(mainFilePath, 'utf-8');
    console.log(`\nMain file (${mainFileName}):\n`, mainData);
  }
  if (templateExists) {
    const templateData = await fs.readFile(templatePath, 'utf-8');
    console.log(`\nTemplate file (template.${extWithJson}):\n`, templateData);
  }
  if (configExists) {
    const configData = await fs.readFile(configPath, 'utf-8');
    console.log(`\nConfig file (config.${extWithJson}):\n`, configData);
  }
}

// Run the test if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  runInitTest();
}
