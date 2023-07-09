import mergeSort from './merge.js';
import levelOrder from './breadth.js';

const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function NewNode(data, left, right) {
  return { data, left: left || null, right: right || null };
}

function TreeFactory(arr) {
  // sort and unique-ify the array before doing anything
  let sortedArr = removeDuplicates(mergeSort(arr));

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

  // breadth-first traversal function, takes a binary tree as input
  // could just take the root node of a tree as input...
  function levelOrder(fn) {
    // make a queue
    const _queue = {
      discoveredNodes: [],
      empty: function () {
        if (this.discoveredNodes[0] === undefined) return true;
        else return false;
      },
    };
    // initialize array if no fn
    if (!fn) {
      let result = [];
    }

    // push the root node onto the tree
    _queue.discoveredNodes.push(treeRoot);

    // repeat until queue is empty
    while (!_queue.empty()) {
      // remove the front of the queue (dequeue the task)
      let current = _queue.discoveredNodes.shift();
      // check for left/right children
      if (current.leftNode !== null) {
        _enqueue(current.leftNode);
      }
      if (current.rightNode !== null) {
        _enqueue(current.rightNode);
      }
      if (fn) {
        fn(current);
        return result;
      } else {
        _visit(current);
      }
    }

    // enqueue
    function _enqueue(node) {
      _queue.discoveredNodes.push(node);
    }

    // dequeue
    function _visit(node) {
      console.log(node);
    }
  }

  // double
  function double(val) {
    return val * 2;
  }

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

  // implement a function rather than using JS methods?
  // Could just use [...new Set(arr)]
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // sample function
  return {
    buildTree,
    levelOrder,
    prettyPrint,
    treeRoot,
    double,
  };
}

const tree = TreeFactory(sample);
tree.prettyPrint(tree.treeRoot);
