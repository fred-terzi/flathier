import readline from 'readline';

export async function handleAddItem(data, tree, selectedIndex, renderToConsole, resetScreen, fhr) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  try {
    const title = await new Promise((resolve) => {
      rl.question('Enter New Item Title: ', resolve);
    });

    if (!title.trim()) {
      console.log('⚠️ Title cannot be empty. Operation canceled.');
      return { data, tree, selectedIndex };
    }

    console.log(`Entered Title: ${title}`);

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
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
}