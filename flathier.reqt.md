<!-- reqt_id: 2025-05-21T03:01:31.868Z-b4dc3408 --start-->

# 0: flathier

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must provide a robust, extensible, and easy-to-use flat hierarchy data structure for managing requirements, features, and hierarchical data. Must support all core and utility operations (add, delete, move, promote, demote, outline computation, etc.) in a flat JSON format.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Project root enables all core and utility features to operate on a flat hierarchy.
- Data structure is human-readable and suitable for git versioning.
- All operations (add, delete, move, etc.) are supported and tested.
- Project documentation and requirements are managed through this root context.

<!-- reqt_Det_field-->
**Details:**

 Represents the root of the FlatHier project, which provides a flat, ordered, human-readable, and git-friendly hierarchical data structure. Serves as the entry point and main context for all features and utilities in the project.

<!-- reqt_README_field-->
**README:**

 FlatHier is a technical foundation for managing hierarchical data in a flat, ordered JSON format. It is engineered for maximum clarity, version control, and automation in requirements and project data management. FlatHier enables all hierarchical operations—such as add, delete, move, promote, demote, and outline computation—while maintaining a single, human-readable source of truth.

Technical Highlights:
- Flat, ordered JSON structure for efficient diffing and git integration
- Deterministic outline and hierarchy computation for robust data integrity
- Designed for seamless automation and programmatic manipulation
- Enables granular tracking and editing of requirements, features, and project metadata
- Optimized for both manual and automated workflows in modern development environments

Use FlatHier to ensure your project's hierarchical data remains consistent, auditable, and ready for both human and machine consumption.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:01:31.868Z-b4dc3408 --end-->

<!-- reqt_id: 2025-05-21T03:44:27.601Z-431b1bdb --start-->

## 1: Installation

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must provide a simple, reliable installation process for the FlatHier library via npm, supporting both local and global installation. Installation must make all core features available and ready to use with minimal setup.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Users can install FlatHier using `npm install flathier` or `npm install -g flathier`.
- After installation, users can import and use FlatHier in their projects without additional configuration.
- All core modules are accessible after installation.
- Installation instructions are documented in the README.
- Installation is tested and verified on at least Linux and one other major OS.

<!-- reqt_Det_field-->
**Details:**

 FlatHier is distributed as an npm package. Users can install it locally for project use or globally for CLI access. The package includes all core and utility modules, and no post-install configuration is required. Installation steps and troubleshooting tips are provided in the project README. Installation is validated through automated and manual tests on supported platforms.

<!-- reqt_README_field-->
**README:**

 To install FlatHier, run:

```bash
npm install flathier
```

Or for global CLI usage:

```bash
npm install -g flathier
```

After installation, you can import FlatHier modules in your project or use the CLI if installed globally. See the README for more details and usage examples.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:44:27.601Z-431b1bdb --end-->

<!-- reqt_id: 2025-05-21T03:44:41.504Z-992bdab5 --start-->

## 2: Core Functions

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must provide all essential core functions for managing a flat hierarchy, including adding, deleting, moving, promoting, demoting, and visualizing items. Each function must operate on a flat JSON structure, maintain data integrity, and support robust error handling.

<!-- reqt_Accept_field-->
**Acceptance:**

 - All core function modules (addObject, asciiTree, deleteObject, demote, moveDown, moveUp, promote) are implemented, tested, and documented.
- Each function passes its respective tests and meets its requirement and acceptance criteria.
- Functions handle edge cases and invalid input gracefully.
- Core functions are accessible after installation and can be used programmatically.
- Documentation describes usage and expected behavior for each function.

<!-- reqt_Det_field-->
**Details:**

 The core functions of FlatHier are implemented as modular JavaScript files in the `src/core/` directory. Each function is responsible for a specific operation on the flat hierarchy data structure, such as inserting, deleting, moving, promoting, or demoting items, as well as rendering the hierarchy as an ASCII-art tree. All core functions are covered by automated tests in the `tests/` directory, and their status is tracked in this requirements document. The successful implementation and testing of these modules ensure the reliability and usability of the FlatHier library.

<!-- reqt_README_field-->
**README:**

 FlatHier's core functions provide all the essential operations needed to manage a flat, ordered hierarchy of items. These include adding, deleting, moving, promoting, demoting, and visualizing items. Each function is modular, well-documented, and thoroughly tested, ensuring robust and predictable behavior for all hierarchy management tasks.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:44:41.504Z-992bdab5 --end-->

<!-- reqt_id: 2025-05-21T03:14:24.688Z-246c2b85 --start-->

### 2.1: addObject.js: Insert and ID new object after outline number

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must insert a new object after a given outline number, assign a unique ID to any field ending with _ID, and recompute outline numbers for all items. Must not modify data if the outline number is invalid.

<!-- reqt_Accept_field-->
**Acceptance:**

 - New object appears immediately after the specified outline number.
- New object has a unique ID in the correct field.
- Outline numbers are correct and consistent after insertion.
- No changes are made if the outline number is invalid, and an error is logged.

<!-- reqt_Det_field-->
**Details:**

 Implements insertion of a new object into a flat hierarchical array after a specified outline number. Inherits hierarchy, assigns a unique ID to any _ID field, and recomputes outlines for all items. Handles errors gracefully if the outline number is invalid.

<!-- reqt_README_field-->
**README:**

 The addObject.js module provides a function to insert a new item into a flat hierarchical data array, assign a unique ID, and update outlines. It ensures data integrity and proper error handling.

**Example Usage:**

```js
import flathier from 'flathier';

const data = [
  { outline: '0', title: 'Root', hier: 0 },
  { outline: '1', title: 'First Item', hier: 1 },
  { outline: '1.1', title: 'Child', hier: 1 },
  { outline: '2', title: 'Sibling', hier: 0 },
  { outline: '2.1', title: 'Another Child', hier: 1 }
  // ... more items
];

const newItem = { title: 'New Sibling'};

(async () => {
  const updated = await flathier.addObject(data, '1', newItem);
  // updated now contains the new item after outline '1', with a unique reqt_ID and correct outlines
})();
```

- Note: `addObject` is accessed as a property of the main `flathier` package export. It is asynchronous and returns a Promise.
- If not already present `hier`, `outline`, or `reqt_ID` fields, they will be added to the new item.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:24.688Z-246c2b85 --end-->

<!-- reqt_id: 2025-05-21T03:14:24.853Z-15c924e7 --start-->

### 2.2: asciiTree.js: Render flat hierarchy as ASCII-art tree

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must generate an ASCII-art tree from a flat array of items, showing hierarchy and including specified fields. Must handle multiple top-level nodes by treating the first as the main root.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Output is a visually correct ASCII-art tree.
- All items are included in the correct hierarchical position.
- Custom fields are displayed as specified.
- Handles multiple top-level nodes by attaching them to the first root.

<!-- reqt_Det_field-->
**Details:**

 Implements a function to render a flat list of items (with outline and title) as an ASCII-art tree. Handles sorting, parent-child relationships, and proper connector symbols. Treats the first top-level item as the main root and supports custom fields for display.

<!-- reqt_README_field-->
**README:**

 The asciiTree.js module provides a function to visualize a flat hierarchy as an ASCII-art tree, making it easy to inspect structure and relationships.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:24.853Z-15c924e7 --end-->

<!-- reqt_id: 2025-05-21T03:14:25.030Z-8beb2478 --start-->

### 2.3: deleteObject.js: Delete item by outline and update hierarchy

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must delete an item by outline number and recompute outlines for all remaining items. Must not modify data if the outline number is invalid.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Item is removed from the array.
- Outline numbers are correct and consistent after deletion.
- No changes are made if the outline number is invalid, and an error is logged.

<!-- reqt_Det_field-->
**Details:**

 Implements deletion of an item from a flat hierarchical array by outline number. Updates the data array and recomputes outlines for the remaining items. Handles errors gracefully if the outline number is invalid.

<!-- reqt_README_field-->
**README:**

 The deleteObject.js module provides a function to remove an item from a flat hierarchical data array and update outlines, ensuring data integrity.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:25.030Z-8beb2478 --end-->

<!-- reqt_id: 2025-05-21T03:14:25.234Z-10e47560 --start-->

### 2.4: demote.js: Demote node and subtree one level

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must demote a node and its subtree one level, updating the hierarchy and outlines. Must not demote the first item or if selection is invalid.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Node and its subtree become the last child of the previous sibling.
- Hierarchy and outlines are updated correctly.
- No changes are made if the selection is invalid or the first item is selected.

<!-- reqt_Det_field-->
**Details:**

 Implements demotion of a node (and its subtree) one level deeper in the hierarchy, making it the last child of its immediate previous sibling. Uses buildTree and flattenTree utilities to update the structure.

<!-- reqt_README_field-->
**README:**

 The demote.js module provides a function to demote a node and its subtree, updating the flat hierarchy structure.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:25.234Z-10e47560 --end-->

<!-- reqt_id: 2025-05-21T03:14:25.390Z-9307aa56 --start-->

### 2.5: moveDown.js: Move node and subtree down among siblings

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must move a node and its subtree down among siblings, updating the order and outlines. Must not modify data if the node is already last or selection is invalid.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Node and its subtree are moved down one position.
- Hierarchy and outlines are updated correctly.
- No changes are made if the node is already last or selection is invalid.

<!-- reqt_Det_field-->
**Details:**

 Implements moving a node (and its subtree) down one position among its siblings in the hierarchy. Updates the order and recomputes outlines. Handles edge cases where the node is already last or selection is invalid.

<!-- reqt_README_field-->
**README:**

 The moveDown.js module provides a function to move a node and its subtree down among siblings, updating the flat hierarchy structure.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:25.390Z-9307aa56 --end-->

<!-- reqt_id: 2025-05-21T03:14:25.588Z-4d92511c --start-->

### 2.6: moveUp.js: Move node and subtree up among siblings

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must move a node and its subtree up among siblings, updating the order and outlines. Must not modify data if the node is already first or selection is invalid.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Node and its subtree are moved up one position.
- Hierarchy and outlines are updated correctly.
- No changes are made if the node is already first or selection is invalid.

<!-- reqt_Det_field-->
**Details:**

 Implements moving a node (and its subtree) up one position among its siblings in the hierarchy. Updates the order and recomputes outlines. Handles edge cases where the node is already first or selection is invalid.

<!-- reqt_README_field-->
**README:**

 The moveUp.js module provides a function to move a node and its subtree up among siblings, updating the flat hierarchy structure.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:25.588Z-4d92511c --end-->

<!-- reqt_id: 2025-05-21T03:14:25.726Z-52e313cd --start-->

### 2.7: promote.js: Promote node and subtree one level up

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must promote a node and its subtree one level up, updating the hierarchy and outlines. Must not promote if already top-level or selection is invalid.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Node and its subtree become a sibling of their parent.
- Hierarchy and outlines are updated correctly.
- No changes are made if the selection is invalid or already top-level.

<!-- reqt_Det_field-->
**Details:**

 Implements promotion of a node (and its subtree) one level up in the hierarchy, making it a sibling of its parent. Uses buildTree and flattenTree utilities to update the structure.

<!-- reqt_README_field-->
**README:**

 The promote.js module provides a function to promote a node and its subtree, updating the flat hierarchy structure.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:25.726Z-52e313cd --end-->

<!-- reqt_id: 2025-05-21T03:44:55.158Z-3fc53c59 --start-->

## 3: Utilities

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 README

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:44:55.158Z-3fc53c59 --end-->

<!-- reqt_id: 2025-05-21T03:14:25.873Z-2f157233 --start-->

### 3.1: buildTree.js: Build nested tree from flat array

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must build a nested tree structure from a flat array, preserving parent-child relationships based on outline and hier fields.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Output is a correct nested tree structure.
- All parent-child relationships are preserved.
- Handles edge cases such as missing parents or multiple roots.

<!-- reqt_Det_field-->
**Details:**

 Implements a utility to convert a flat array of items (with outline and hier fields) into a nested tree structure. Used for hierarchical operations and visualization.

<!-- reqt_README_field-->
**README:**

 The buildTree.js utility provides a function to convert a flat hierarchy into a nested tree, enabling hierarchical operations and visualizations.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:25.873Z-2f157233 --end-->

<!-- reqt_id: 2025-05-21T03:14:26.036Z-3165bb30 --start-->

### 3.2: computeOutlines.js: Recompute outline numbers for all items

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must recompute outline numbers for all items in the array, reflecting the current hierarchy and order.

<!-- reqt_Accept_field-->
**Acceptance:**

 - All items have correct and consistent outline numbers after changes.
- Handles edge cases such as empty arrays or deeply nested structures.

<!-- reqt_Det_field-->
**Details:**

 Implements a utility to recalculate outline numbers for all items in a flat hierarchy after structural changes (insert, delete, move, etc.). Ensures outline consistency.

<!-- reqt_README_field-->
**README:**

 The computeOutlines.js utility ensures that all items in a flat hierarchy have correct outline numbers after any structural modification.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:26.036Z-3165bb30 --end-->

<!-- reqt_id: 2025-05-21T03:14:26.191Z-184d74d5 --start-->

### 3.3: editTitle.js: Edit the title of an item by outline

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must update the title of the specified item by outline number, leaving other fields unchanged.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Only the title field is updated for the specified item.
- No changes are made if the outline number is invalid.

<!-- reqt_Det_field-->
**Details:**

 Implements a utility to update the title field of an item in a flat hierarchy, identified by its outline number.

<!-- reqt_README_field-->
**README:**

 The editTitle.js utility provides a function to update the title of an item in a flat hierarchy by outline number.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:26.191Z-184d74d5 --end-->

<!-- reqt_id: 2025-05-21T03:14:26.345Z-ace32d0d --start-->

### 3.4: flattenTree.js: Flatten nested tree to flat array

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must flatten a nested tree into a flat array, preserving outline and hier information for each item.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Output is a flat array with correct outline and hier fields.
- All items from the tree are included.
- Handles edge cases such as empty trees or single-node trees.

<!-- reqt_Det_field-->
**Details:**

 Implements a utility to convert a nested tree structure back into a flat array, assigning correct outline and hier fields.

<!-- reqt_README_field-->
**README:**

 The flattenTree.js utility provides a function to flatten a nested tree structure into a flat array for storage or further processing.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:26.345Z-ace32d0d --end-->

<!-- reqt_id: 2025-05-21T03:14:26.495Z-c5078ce8 --start-->

### 3.5: generateUniqueId.js: Generate unique IDs for items

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Must generate a unique, timestamp-based ID string for use in item fields.

<!-- reqt_Accept_field-->
**Acceptance:**

 - Generated IDs are unique and include a timestamp.
- Can be used for any field ending with _ID.

<!-- reqt_Det_field-->
**Details:**

 Implements a utility to generate unique IDs for items, typically used for fields ending with _ID. Ensures uniqueness and timestamp-based IDs.

<!-- reqt_README_field-->
**README:**

 The generateUniqueId.js utility provides a function to generate unique, timestamp-based IDs for use in hierarchical data structures.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:26.495Z-c5078ce8 --end-->