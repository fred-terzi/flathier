import readline from 'readline';

export async function handleAddItem(data, tree, selectedIndex, renderToConsole, resetScreen, fhr) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  try {
    let escPressed = false;
    const title = await new Promise((resolve) => {
      // Move cursor to the second-to-last line and clear it
      const [, h] = process.stdout.getWindowSize();
      const row = h - 1; // Second-to-last line
      process.stdout.write(`\x1B[${row};0H\x1B[K`); // Clear the line
      process.stdout.write('\x1B[?25h'); // Show cursor
      
      // Listen for Esc key
      function onKeypress(str, key) {
        if (key && key.name === 'escape') {
          escPressed = true;
          process.stdin.removeListener('keypress', onKeypress);
          rl.close();
          resolve(null); // Clean exit, no error
        }
      }
      process.stdin.on('keypress', onKeypress);
      rl.question('\x1b[34mEnter New Item Title: \x1b[0m', (answer) => {
        process.stdin.removeListener('keypress', onKeypress);
        resolve(answer);
      });
    });

    if (escPressed || !title || !title.trim()) {
      // Rerender tree and exit silently
      tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);
      resetScreen();
      await renderToConsole(tree, selectedIndex);
      return { data, tree, selectedIndex };
    }

    const lastItemOutline = await fhr.getLastItemOutline(data);
    data = await fhr.addObject(data, lastItemOutline, title);

    const newLastItemOutline = await fhr.getLastItemOutline(data);
    const newItem = data.find((item) => item.outline === newLastItemOutline);
    newItem.title = title;

    await fhr.saveData(data);
    tree = await fhr.createAsciiTree(data, ['title', 'unique_id']);
    resetScreen();

    selectedIndex = data.findIndex((item) => item.outline === newLastItemOutline) - 1;
    await renderToConsole(tree, selectedIndex);

    return { data, tree, selectedIndex };
  } catch (err) {
    console.error('❌ Error adding item:', err);
    return { data, tree, selectedIndex };
  } finally {
    rl.close();
    process.stdin.resume(); // ✅ Keep stdin open

  }
}