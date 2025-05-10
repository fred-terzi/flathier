#!/usr/bin/env node
import init from '../src/commands/init.js';

// Set the FHR_ROOT_DIR environment variable
process.env.FHR_ROOT_DIR = process.cwd(); // Sets it to the current working directory

// Simple CLI argument parser without dependencies
const args = process.argv.slice(2);

// If no arguments are provided, show usage
if (args.length === 0) {
  console.log('Usage: fhr <command> [options]');
  console.log('Commands:');
  console.log('  init "<file_name>"   Initialize a new file with the given name');
  console.log('Options:');
  console.log('  --help            Show this help message');
  process.exit(1);
}

// Check first arg for command
const command = args[0];
const options = args.slice(1);

// Handle the init command
if (command === 'init') {
  const fileName = options[0];
  if (fileName) {
    await init(fileName);
  } else {
    console.error('Error: No file name provided for init command.');
    process.exit(1);
  }
}