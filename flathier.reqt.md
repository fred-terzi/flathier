<!-- reqt_id: 2025-05-21T03:01:31.868Z-b4dc3408 --start-->

# 0: flathier

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

<!-- reqt_id: 2025-05-21T03:01:31.868Z-b4dc3408 --end-->

<!-- reqt_id: 2025-05-21T03:14:24.688Z-246c2b85 --start-->

## 1: addObject.js: Insert and ID new object after outline number

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

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README_AI:**

include

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T03:14:24.688Z-246c2b85 --end-->

<!-- reqt_id: 2025-05-21T03:14:24.853Z-15c924e7 --start-->

## 2: asciiTree.js: Render flat hierarchy as ASCII-art tree

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | true | true |
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

## 3: deleteObject.js: Delete item by outline and update hierarchy

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | true | true |
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

## 4: demote.js: Demote node and subtree one level

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | true | true |
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

## 5: moveDown.js: Move node and subtree down among siblings

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | true | true |
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

## 6: moveUp.js: Move node and subtree up among siblings

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | true | true |
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

## 7: promote.js: Promote node and subtree one level up

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | true | true |
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

<!-- reqt_id: 2025-05-21T03:14:25.873Z-2f157233 --start-->

## 8: buildTree.js feature

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

<!-- reqt_id: 2025-05-21T03:14:25.873Z-2f157233 --end-->

<!-- reqt_id: 2025-05-21T03:14:26.036Z-3165bb30 --start-->

## 9: computeOutlines.js feature

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

<!-- reqt_id: 2025-05-21T03:14:26.036Z-3165bb30 --end-->

<!-- reqt_id: 2025-05-21T03:14:26.191Z-184d74d5 --start-->

## 10: editTitle.js feature

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

<!-- reqt_id: 2025-05-21T03:14:26.191Z-184d74d5 --end-->

<!-- reqt_id: 2025-05-21T03:14:26.345Z-ace32d0d --start-->

## 11: flattenTree.js feature

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

<!-- reqt_id: 2025-05-21T03:14:26.345Z-ace32d0d --end-->

<!-- reqt_id: 2025-05-21T03:14:26.495Z-c5078ce8 --start-->

## 12: generateUniqueId.js feature

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

<!-- reqt_id: 2025-05-21T03:14:26.495Z-c5078ce8 --end-->

<!-- reqt_id: 2025-05-21T03:14:26.641Z-9c64dcb3 --start-->

## 13: api.js feature

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

<!-- reqt_id: 2025-05-21T03:14:26.641Z-9c64dcb3 --end-->