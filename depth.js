// These algorithms sort an array into these orders
// need to change them to just a traversal method and discover/visit them
let result = [];
// takes root node of the tree
function preOrder(root, fn) {
  // root
  if (fn) fn(root);
  // left subtree
  if (fn)
    if (root.leftNode !== null) {
      preOrder(tree[root.leftNode]);
    }
  // right subtree
  if (root.rightNode !== null) {
    preOrder(tree[root.rightNode]);
  }
}

function inOrder(root, fn) {
  // left subtree
  if (root.leftNode !== null) {
    inOrder(tree[root.leftNode]);
  }
  // root
  result.push(root.value);
  // right subtree
  if (root.rightNode !== null) {
    inOrder(tree[root.rightNode]);
  }
}

inOrder(tree[0]);
console.log(result.join(' '));

function postOrder(root, fn) {
  // left subtree
  if (root.leftNode !== null) {
    postOrder(tree[root.leftNode]);
  }
  // right subtree
  if (root.rightNode !== null) {
    postOrder(tree[root.rightNode]);
  }
  // root
  result.push(root.value);
}
