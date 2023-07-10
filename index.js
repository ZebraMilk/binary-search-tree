const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function NewNode(data, left, right) {
  return { data, left: left || null, right: right || null };
}

function TreeFactory(arr) {
  // sort and unique-ify the array before doing anything
  let sortedArr = _removeDuplicates(arr.sort((a, b) => a - b));

  const treeRoot = buildTree(sortedArr, 0, sortedArr.length - 1);

  function buildTree(array, start, end) {
    // account for fractions
    let middle = Math.floor((start + end) / 2);
    let root = NewNode(array[middle]);
    // if we've moved past the end of the array, point to nothing
    if (start > end) return null;
    root.left = buildTree(array, start, middle - 1);
    root.right = buildTree(array, middle + 1, end);

    return root;
  }

  // breadth-first traversal
  function levelOrder(fn) {
    let queue = [];
    let result = [];

    // push the root node onto the tree
    queue.push(treeRoot);

    // repeat until queue is empty
    while (queue.length) {
      // take a node from the front of the queue
      let current = queue.shift();
      // check for left/right children
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
      _visit(current);
    }

    return result;

    // dequeue
    function _visit(node) {
      if (fn) {
        // do the thing if there's a thing to do
        node.data = fn(node.data);
      }
      result.push(node.data);
    }
  }

  function preOrder(fn, root = treeRoot, result = []) {
    if (fn) {
      root.data = fn(root.data);
    }
    // left subtree
    if (root.left !== null) {
      preOrder(fn, root.left, result);
    }
    // right subtree
    if (root.right !== null) {
      preOrder(fn, root.right, result);
    }
    result.push(root.data);
    // return result only if traversed back up the tree
    if (root === treeRoot) return result;
  }

  // Look at this gorgeous function with ternary recursive parameters
  function prettyPrint(node, prefix = '', isLeft = true) {
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
  }

  // double, test function
  function double(val) {
    return val * 2;
  }
  /* Private Methods */

  // implement a function rather than using JS methods?
  // Could just use [...new Set(arr)]
  function _removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  return {
    buildTree,
    levelOrder,
    preOrder,
    prettyPrint,
    treeRoot,
    double,
  };
}

// works for passing in a sample
const tree = TreeFactory(sample);
tree.prettyPrint(tree.treeRoot);
// console.log(tree.levelOrder());
// console.log(tree.levelOrder(tree.double));

console.log(tree.preOrder());
console.log(tree.preOrder(tree.double));
// const newTree = TreeFactory(tree.levelOrder(tree.double));
// newTree.prettyPrint(newTree.treeRoot);
// console.log(tree.levelOrder());
