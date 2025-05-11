#!/usr/bin/env node

// Disable progress bar if NO_PROGRESS_BAR is set
global.showProgress = !process.env.NO_PROGRESS_BAR;

// Set the FHR_ROOT_DIR environment variable
process.env.FHR_ROOT_DIR = process.cwd(); // Sets it to the current working directory

// Simple CLI argument parser without dependencies
const args = process.argv.slice(2);

// If no arguments are provided, show usage
if (args.length === 0) {
  import('../src/commands/help.js').then(({ default: displayHelp }) => {
    displayHelp();
    process.exit(0);
  });
} else {
  // Check first arg for command
  const command = args[0];
  const options = args.slice(1);

  const commands = {
    help: async () => {
      const { default: displayHelp } = await import('../src/commands/help.js');
      await displayHelp();
    },
    init: async (options) => {
      const { default: init } = await import('../src/commands/init.js');
      const fileName = options.join('_'); // Combine all options with underscores
      if (fileName) {
        await init(fileName);
      } else {
        console.error('❌ Error: No file name provided for init command. \nUsage: fhr init "<file_name>"');
        process.exit(1);
      }
    },
    add_after: async (options) => {
      const { loadData, saveData } = await import('../src/dataHandler.js');
      const { default: addObject } = await import('../src/core/addObject.js');
      const outline = options[0];
      if (outline) {
        try {
          const data = await loadData();
          const updatedData = await addObject(data, outline);

          if (updatedData) {
            await saveData(updatedData);
            console.log(`✅ Successfully added a new item after outline: ${outline}`);
          } else {
            console.error(`⚠️  Failed to add a new item after outline: ${outline}`);
          }
        } catch (error) {
          console.error(`❌ Error: ${error.message}`);
        }
      } else {
        console.error('Error: No outline provided for add-after command.');
        process.exit(1);
      }
    },
    add: async () => {
      const { loadData, saveData } = await import('../src/dataHandler.js');
      const { default: addObject } = await import('../src/core/addObject.js');
      try {
        const data = await loadData();
        // Get the outline number of the last item in the data array
        const lastItem = data[data.length - 1];
        const lastOutline = lastItem ? lastItem.outline : '1';
        const updatedData = await addObject(data, lastOutline);

        if (updatedData) {
          await saveData(updatedData);
          console.log('✅ Successfully added a new item to the end of the list.');
        } else {
          console.error('⚠️  Failed to add a new item to the end of the list.');
        }
      } catch (error) {
        console.error(`❌ Error: ${error.message}`);
      }
    },
    editor: async () => {
      const { spawn } = await import('child_process');
      const editorProcess = spawn('node', ['./bin/fhr-editor.js'], {
        stdio: 'inherit', // Inherit stdio to allow interaction with the terminal
        shell: true, // Use shell to ensure compatibility with different environments
      });
    
      editorProcess.on('close', (code) => {

      });
    },
  };

  (async () => {
    if (commands[command]) {
      await commands[command](options);
    } else {
      const { default: displayHelp } = await import('../src/commands/help.js');
      console.error(`Unknown command: ${command}`);
      displayHelp();
      process.exit(1);
    }
  })();
}