#!/usr/bin/env node
import init from '../src/commands/init.js';

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
  const sanitizedFileName = fileName.replace(/\s+/g, '_'); // Replace spaces with underscores
  if (fileName) {
    await init(sanitizedFileName);
  } else {
    console.error('Error: No file name provided for init command.');
    process.exit(1);
  }
}