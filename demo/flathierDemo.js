import fs from 'fs';
import flathier from '../lib/api.js';

const DEMO_DATA_PATH = './demo/flathierDemo.json';
const TEMPLATE_PATH = './demo/demoNewItem.json';

// Helper: Print 3, 2, 1 in the same row, one per second, then clear the console
async function countdown() {
    const blue = '\x1b[34m';
    const reset = '\x1b[0m';
    for (let count = 2; count > 0; count--) {
        process.stdout.write(`\r${blue}${count}${reset}   `);
        await new Promise(res => setTimeout(res, 1000));
    }
    process.stdout.write('\r     \r'); // Clear the line
    process.stdout.write('\x1Bc');      // Clear the console after every countdown
}

function loadData() {
    return JSON.parse(fs.readFileSync(DEMO_DATA_PATH, 'utf-8'));
}

function saveData(data) {
    fs.writeFileSync(DEMO_DATA_PATH, JSON.stringify(data, null, 2));
}

function loadTemplate() {
    return JSON.parse(fs.readFileSync(TEMPLATE_PATH, 'utf-8'));
}

function printData(data) {
    if (Array.isArray(data)) {
        // If the data is an array of strings (ASCII tree), join and print as lines
        if (typeof data[0] === 'string') {
            process.stdout.write(data.join(''));
        } else {
            // Otherwise, print as JSON or objects
            console.log(data);
        }
    } else {
        console.log(data);
    }
}

async function showAsciiTree(data, message) {
    if (!Array.isArray(data)) {
        console.error('Data passed to createAsciiTree is not an array:', data);
        return;
    }
    const asciiTree = await flathier.createAsciiTree(data, ['topic', 'presenter']);
    if (message) console.log(message);
    console.log('----------------------------------------');
    printData(asciiTree);
}

async function runDemo() {
    console.clear();
    let data = loadData();
    // Deep copy to preserve the original data
    const originalData = JSON.parse(JSON.stringify(data));
    if (!Array.isArray(data)) {
        console.error('Loaded data is not an array. Please check flathierDemo.json.');
        return;
    }
    // Remove computeOutlines before first showAsciiTree
    await showAsciiTree(data, 'Original data in flathierDemo.json:');
    await countdown();

    let dataWithOutlines = flathier.computeOutlines(data);
    saveData(dataWithOutlines);

    await showAsciiTree(dataWithOutlines, 'flathier.computeOutlines() added outlines:');
    await countdown();

    // Add a new item to the end of the list
    const newItem = loadTemplate();
    newItem.topic = 'New Item';
    let addToEndData = await flathier.addObject(dataWithOutlines, "1", newItem);
    if (!Array.isArray(addToEndData)) {
        console.error('addObject did not return an array:', addToEndData);
        return;
    }
    saveData(addToEndData);
    await showAsciiTree(addToEndData, 'Data after adding a new item to the end:');
    await countdown();

    // Change the second item topic to "Demote Item"
    // Use the correct outline string, not a number
    // Find the outline of the second item
    const demoteOutline = "2"
    
    let demoteData = await flathier.demote(addToEndData, demoteOutline);
    if (!Array.isArray(demoteData)) {
        console.error('demoteItem did not return an array:', demoteData);
        return;
    }
    // Change the topic of the demoted item
    // Find the index of the demoted item in the new array

    saveData(demoteData);
    await showAsciiTree(demoteData, `flathier.demote("${demoteOutline}")`)
    await countdown();

    // Add a new item  after 1.1 called "Promote Item"
    const newItem2 = loadTemplate();
    newItem2.topic = 'Promote Item';
    let addToEndData2 = await flathier.addObject(demoteData, "1.1", newItem2);
    if (!Array.isArray(addToEndData2)) {
        console.error('addObject did not return an array:', addToEndData2);
        return;
    }
    saveData(addToEndData2);
    // clear the console
    await showAsciiTree(addToEndData2, 'Data after adding a new item after 1.1:');
    await countdown();

    // Promte item 1.2
    const promoteOutline = "1.2"
    let promoteData = await flathier.promote(addToEndData2, promoteOutline);
    if (!Array.isArray(promoteData)) {
        console.error('promoteItem did not return an array:', promoteData);
        return;
    }
    saveData(promoteData);
    await showAsciiTree(promoteData, `flathier.promote("${promoteOutline}")`)
    await countdown();

    // Move item 1 down
    const moveOutline = "1"
    let moveData = await flathier.moveDown(promoteData, moveOutline, "down");
    if (!Array.isArray(moveData)) {
        console.error('moveItem did not return an array:', moveData);
        return;
    }
    saveData(moveData);
    await showAsciiTree(moveData, `flathier.moveDown("${moveOutline}")`)
    await countdown();

    newItem2.topic = 'Insert After Item 2.1';
    let insertData = await flathier.addObject(moveData, "2.1", newItem2);
    if (!Array.isArray(insertData)) {
        console.error('insertItem did not return an array:', insertData);
        return;
    }
    saveData(insertData);
    await showAsciiTree(insertData, `flathier.addObject()`)
    await countdown();

    // write the original data back into the file
    saveData(data);

    // Add 100 items to the end of the list as fast as possible
    let demotePromoteCounter = 0;
    let itemCount = 100
    const startTime = Date.now();
    for (let i = 0; i < itemCount; i++) {
        const newItem = loadTemplate();
        newItem.topic = `New Item ${i}`;
        // Get the outline number of the last item in the list
        const lastItemOutline = addToEndData[addToEndData.length - 1].outline;
        addToEndData = await flathier.addObject(addToEndData, lastItemOutline, newItem);
        const newItemOutline = addToEndData[addToEndData.length - 1].outline;
        // demote for 0,1,2; promote for 3,4,5; then reset
        if (demotePromoteCounter >= 0 && demotePromoteCounter <= 2) {
            addToEndData = await flathier.demote(addToEndData, newItemOutline);
        } else if (demotePromoteCounter >= 3 && demotePromoteCounter <= 5) {
            addToEndData = await flathier.promote(addToEndData, newItemOutline);
        }
        demotePromoteCounter++;
        if (demotePromoteCounter > 5) {
            demotePromoteCounter = 0;
        }
        // Always recompute outlines after each manipulation to maintain a valid hierarchy
        addToEndData = flathier.computeOutlines(addToEndData);
        if (!Array.isArray(addToEndData)) {
            console.error('addObject did not return an array:', addToEndData);
            return;
        }
    }

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    await showAsciiTree(addToEndData, `Data after adding ${itemCount} items to the end:`);


    // // save the original data back into the file
    // saveData(originalData);
    // console.log('----------------------------------------');
    // console.log('Demo complete. Original data restored.');
    // console.log('----------------------------------------');
}

runDemo();
