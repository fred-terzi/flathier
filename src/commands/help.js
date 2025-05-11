export default function displayHelp() {
  console.log(`Usage: fhr <command> [options]

Commands:
  init "<file_name>"   Initialize a new project with the given name

  add   Add new item to the end of the list. The new item will use the .fhr/template.fhr.json last object.

  add_after <outline>   Add a new item after the specified outline. The new item will use the .fhr/template.fhr.json last object.

Options:
  --help            Show this help message`);
}