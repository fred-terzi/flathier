#!/usr/bin/env node
import init from '../src/commands/init.js';

// Simple CLI argument parser without dependencies
const args = process.argv.slice(2);

// If no arguments are provided, show usage
if (args.length === 0) {
  console.log('Usage: cli.js <command> [options]');
  console.log('Commands:');
  console.log('  init <file_name>   Initialize a new file with the given name');
  console.log('Options:');
  console.log('  --help            Show this help message');
  process.exit(1);
}

console.log('Arguments:', args);

// Check first arg for command
const command = args[0];
const options = args.slice(1);
console.log('Command:', command);
console.log('Options:', options);

// Handle the init command
if (command === 'init') {
  const fileName = options[0];
  await init(fileName);
}