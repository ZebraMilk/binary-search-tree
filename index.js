const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function createSampleSet(elements, maxValue) {
  // populate a Set with up to maxValue elements
  // random number generator, sorta
  let arr = [];
  let sampleSet = new Set([...arr]);
  return sampleSet;
}

function createSimpleSample(maxValue) {
  let simpleSample = [];
  for (let i = 0; i < maxValue; i++) {
    simpleSample[i] = i + 1;
  }
  return simpleSample;
}

function NewNode(data, left, right) {
  return { data, left: left || null, right: right || null };
}

function TreeFactory(arr) {
  // sort and unique-ify the array before doing anything
  let sortedArr = [...new Set(arr)].sort((a, b) => a - b);

  // // implement a function rather than using JS methods?
  // // Could just use [...new Set(arr)]
  // function _removeDuplicates(arr) {
  //   return [...new Set(arr)];
  // }
  // make the tree!
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
      fn ? result.push(fn(current.data)) : result.push(current.data);
    }
    return result;
  }

  function preOrder(fn, root = treeRoot, result = []) {
    // left subtree
    if (root.left !== null) {
      preOrder(fn, root.left, result);
    }
    // root
    fn ? result.push(fn(root.data)) : result.push(root.data);
    // right subtree
    if (root.right !== null) {
      preOrder(fn, root.right, result);
    }
    // return result only if traversed back up the tree
    if (root === treeRoot) return result;
  }

  function inOrder(fn, root = treeRoot, result = []) {
    // root
    fn ? result.push(fn(root.data)) : result.push(root.data);
    // left subtree
    if (root.left !== null) {
      preOrder(fn, root.left, result);
    }
    // right subtree
    if (root.right !== null) {
      preOrder(fn, root.right, result);
    }
    // return result only if traversed back up the tree
    if (root === treeRoot) return result;
  }

  function postOrder(fn, root = treeRoot, result = []) {
    // left subtree
    if (root.left !== null) {
      preOrder(fn, root.left, result);
    }
    // right subtree
    if (root.right !== null) {
      preOrder(fn, root.right, result);
    }
    // root
    fn ? result.push(fn(root.data)) : result.push(root.data);
    // return result only if traversed back up the tree
    if (root === treeRoot) return result;
  }

  function find(value, root = treeRoot) {
    if (root.data === value) {
      // returns the node when found
      return root;
    }
    // search left subtree
    if (root.data > value && root.left) {
      return find(value, root.left);
    } // search right subtree
    else if (root.data < value && root.right) {
      return find(value, root.right);
    }
    console.log('Value not in Tree.');
    return null;
  }

  function insertNode(value, root = treeRoot, previousNode = treeRoot) {
    // only check the tree for the node if checking the treeRoot
    if (root === treeRoot && find(value) !== null) {
      return null;
    }
    // fix this
    if (root === null) return null;

    // compare root.value, previousNode.value
  }

  function deleteNode(value) {
    // if leaf node

    // if 1 child

    // if 2 children
    return newRoot;
  }

  function depth(value, root = treeRoot, nodeDepth = 0) {
    // traverse from root to node with given value
    if (root.data === value) {
      return nodeDepth;
    }
    nodeDepth++;
    if (root.data > value && root.left) {
      // look in left subtree
      return depth(value, root.left, nodeDepth);
    } else if (root.data < value && root.right) {
      // look in right subtree
      return depth(value, root.right, nodeDepth);
    }
    return nodeDepth;
  }

  // pass in the node, not the value of the node
  function height(root = value) {
    // convert initial value into the node if it exists
    if (typeof root === 'number') {
      root = find(root);
    }
    if (root === null) {
      return 0;
    }
    let leftHeight = -1;
    let rightHeight = -1;
    // only start doing stuff if node is found
    if (root.left !== null) {
      // get height of the left subtree
      leftHeight = height(root.left);
    }
    if (root.right !== null) {
      // get height of the right subtree
      rightHeight = height(root.right);
    }
    // if root has no children, return the greater height
    return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
  }

  /* Utility Methods */

  // Look at this gorgeous function with ternary recursive arguments
  // Thanks, TOP :)
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

  // test function for *Order functions
  function testFn(val) {
    // double
    return val * 2;
  }

  return {
    buildTree,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    find,
    insertNode,
    depth,
    height,
    prettyPrint,
    treeRoot,
    testFn,
  };
}

// works for passing in a sample
const tree = TreeFactory(sample);
tree.prettyPrint(tree.treeRoot);

// console.log(tree.levelOrder());
// console.log(tree.levelOrder(tree.testFn));

// console.log(tree.preOrder());
// console.log(tree.preOrder(tree.testFn));

// console.log(tree.find(5));
// console.log(tree.find(8));
// console.log(tree.find(3));
// console.log(tree.find(100));

// console.log(tree.depth(5));
// console.log(tree.depth(1));
// console.log(tree.depth(4));

// console.log(tree.height(5));
// console.log(tree.height(1));
// console.log(tree.height(8));
// console.log(tree.height(4));

let newSample = createSimpleSample(1000);
const newTree = TreeFactory(newSample);

newTree.prettyPrint(newTree.treeRoot);
// console.log(newTree.find(550));

// console.log(newTree.height(5));
// console.log(newTree.height(1));
// console.log(newTree.height(8));
// console.log(newTree.height(500));
