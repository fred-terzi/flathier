#!/usr/bin/env node
import displayHelp from '../src/commands/help.js';
import init from '../src/commands/init.js';

// Set the FHR_ROOT_DIR environment variable
process.env.FHR_ROOT_DIR = process.cwd(); // Sets it to the current working directory

// Simple CLI argument parser without dependencies
const args = process.argv.slice(2);

// If no arguments are provided, show usage
if (args.length === 0) {
  displayHelp();
  process.exit(0);
}

// Check first arg for command
const command = args[0];
const options = args.slice(1);

const commands = {
  help: async () => await help(),
  init: async (options) => {
    const fileName = options[0];
    if (fileName) {
      await init(fileName);
    } else {
      console.error('Error: No file name provided for init command.');
      process.exit(1);
    }
  },
};

(async () => {
  if (commands[command]) {
    await commands[command](options);
  } else {
    console.error(`Unknown command: ${command}`);
    displayHelp();
    process.exit(1);
  }
})();