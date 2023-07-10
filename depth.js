// These algorithms sort an array into these orders
// need to change them to just a traversal method and discover/visit them
let result = [];
// takes root node of the tree
function preOrder(root, fn) {
  // root
  if (fn) fn(root);
  // left subtree
  if (root.leftNode !== null) {
    preOrder(root.leftNode);
  }
  // right subtree
  if (root.rightNode !== null) {
    preOrder(root.rightNode);
  }
}

function inOrder(root, fn) {
  // left subtree
  if (root.leftNode !== null) {
    inOrder(root.leftNode);
  }
  // root
  result.push(root.value);
  // right subtree
  if (root.rightNode !== null) {
    inOrder(root.rightNode);
  }
}

function postOrder(root, fn) {
  // left subtree
  if (root.leftNode !== null) {
    postOrder(root.leftNode);
  }
  // right subtree
  if (root.rightNode !== null) {
    postOrder(root.rightNode);
  }
  // root
  result.push(root.value);
}
