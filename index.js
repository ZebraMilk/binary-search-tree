import mergeSort from './merge';

function NewNode(data, left, right) {
  return { data, left: left || null, right: right || null };
}

function TreeFactory(arr) {
  return (root = buildTree(arr));
}

function buildTree(arr) {
  // sort the array
  let sortedArr = mergeSort(arr);

  let root = null;

  sortedArr.forEach((value) => {
    // make a new node with the value
    const newNode = treeNode(value);
    console.log(newNode);
    // make a "pointer" index/currentNode to track location within the tree
    // start at beginning of the tree
    // this is just a reference... not updating the values.
    let currentNode = tree[0];
    // if no root value, make newNode the root;
    if (!currentNode) {
      tree.push(newNode);
      console.log(currentNode);
      console.table(tree);
    }
    // compare newNode.value with tree[index]
    // if greater or equal
    // if right === null
    // set right to new node, push newNode to currentNode.right
    // else if right
    // move pointer index to current.right
    // go to line 6
    // else (value is less than)
    // if left === null
    // set left to new node
    // else if left
    // move currentNode to current.left
    // go to line 6
  });
  return root;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
