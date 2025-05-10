import { flattenTree } from '../utils/flattenTree.js';

/**
 * Promotes a node (and its entire subtree) one level up in the hierarchy
 * @param items - array of nodes with unique_id, title, hier, outline
 * @param outlineToPromote - the outline string of the node to promote
 * @returns new flattened array with updated hier and outline
 */
export function promote(data, outlineToPromote) {


    if (!outlineToPromote) {
        return data; // Return unchanged data if no valid selection
    }

    const { roots, nodeMap } = buildTree(data);

    // Locate node and its parent
    const parts = outlineToPromote.split('.');
    if (parts.length === 1) return data; // already top-level
    const parentOutline = parts.slice(0, -1).join('.');
    const parentParts = parentOutline.split('.');
    const grandParentArr = parentParts.length === 1
      ? roots
      : nodeMap[parentParts.slice(0, -1).join('.')].children;
    const parentArr = nodeMap[parentOutline].children || [];

    // Remove from current parent
    const idx = parentArr.findIndex(n => n.outline === outlineToPromote);
    if (idx < 0) return data;
    const [node] = parentArr.splice(idx, 1);

    // Insert into grandparent after parent
    const parentIndex = grandParentArr.findIndex(n => n.outline === parentOutline);
    grandParentArr.splice(parentIndex + 1, 0, node);

    return flattenTree(roots); // Return the updated data
}

/**
 * Utility: builds a tree structure and index map from flat items
 */
function buildTree(items) {
  const nodes = items.map(i => ({ ...i, children: [] }));
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.outline] = n; });
  const roots = [];
  nodes.forEach(n => {
    const parts = n.outline.split('.');
    if (parts.length === 1) roots.push(n);
    else nodeMap[parts.slice(0, -1).join('.')].children.push(n);
  });
  return { roots, nodeMap };
}
