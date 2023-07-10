import _mergeSort from './merge.js';

const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function NewNode(data, left, right) {
  return { data, left: left || null, right: right || null };
}

function TreeFactory(arr) {
  // sort and unique-ify the array before doing anything
  let sortedArr = _removeDuplicates(_mergeSort(arr));
  // let sortedArr = _removeDuplicates(arr.sort((a, b) => a - b));

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

  // breadth-first traversal, takes a root or the treeRoot first
  // can make it recursive by passing the queue as a parameter?
  // or give access to private _queue and _result arrays
  function levelOrder(root = treeRoot, queue = [], result = [], fn) {
    if (fn) {
      // if callback provided, do it
      root = fn(root);
    }
    // visit the root node's value
    result.push(root.data);

    // discover children of root if they exist
    if (root.left) queue.push(root.left);
    if (root.right) queue.push(root.right);
    while (queue.length) levelOrder(queue.shift(), queue, result);

    // exit and return the resulting array
    return result;
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
    prettyPrint,
    treeRoot,
    double,
  };
}

// works for passing in a sample
const tree = TreeFactory(sample);
tree.prettyPrint(tree.treeRoot);
const newTree = TreeFactory(tree.levelOrder(tree.double));
newTree.prettyPrint(newTree.treeRoot);
// console.log(tree.levelOrder());
