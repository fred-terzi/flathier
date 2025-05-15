## Flow Diagram of the Library

Below is a high-level flow diagram of how the main functions in the flathier library interact:

```mermaid
flowchart TD
    A["init()"] --> B[".fhr.json file created"]
    B --> C["loadData()"]
    C --> D["setData()"]
    D --> E["addObject()/deleteObject()/promote()/demote()/moveUp()/moveDown()"]
    E --> F["saveData()"]
    C --> G["getLastItemOutline()"]
    C --> H["getLastTemplateObject()"]
    C --> I["createAsciiTree()"]
    
    subgraph Utility
      G
      H
      I
    end
```

## Flow Diagram of the init function

version: 0.1.0-demo.8

```mermaid
flowchart TD
    A["init(fileName, customExt)"] --> B["Find project root (package.json)"]
    B --> C["Sanitize fileName and customExt"]
    C --> D["Check if main project file exists"]
    D -- Yes --> E["Abort: Project file already exists"]
    D -- No --> F["Create config & template folder structure"]
    F --> G["Store customExt in customExtStore.json"]
    G --> H["Write clean template (title, PLACEHOLDER unique_id)"]
    H --> I["Copy and update config template (filepath)"]
    I --> J["Create working copy with generated unique_id"]
    J --> K["Write main project file"]
    K --> L["Initialization complete"]
```

version: 0.1.0-demo.9 proposed changes

```mermaid
flowchart TD
    A["init(fileName, customExt)"] --> B["Find project root (package.json)"]
    B --> C["Sanitize fileName and customExt"]
    C --> D["Check if main project file exists in new folder"]
    D -- Yes --> E["Abort: Project file already exists"]
    D -- No --> F["Create config & template folder structure"]
    F --> G["Store customExt in customExtStore.json"]
    G --> H["Write clean template (title, PLACEHOLDER unique_id)"]
    H --> I["Copy and update config template (filepath points to file in new folder)"]
    I --> J["Create working copy with generated unique_id"]
    J --> K["Write main project file in new folder"]
    K --> L["Initialization complete"]
```

This diagram shows the step-by-step logic of the `init` function, including handling of custom extensions, template/config creation, and unique ID generation.

## deleteObject function

### Flow Diagram

```mermaid
flowchart TD
    A["deleteObject(data, outlineNumber)"] --> B["Find index of item with outlineNumber"]
    B -- Not found --> C["Log error and return"]
    B -- Found --> D["Remove item at found index from data array"]
    D --> E["Recompute outlines for the entire data array"]
    E --> F["Return updated data array"]
```