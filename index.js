const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// make an array of consecutive integers in order from 1 to maxValue
function createSimpleSample(maxValue) {
  let simpleSample = [];
  for (let i = 0; i < maxValue; i++) {
    simpleSample[i] = i + 1;
  }
  return simpleSample;
}

// return an array with maxElements integers between 0 and maxValue
// works best with a large difference between maxValue and maxElements
function createSampleSet(maxElements, maxValue) {
  let arr = [];
  for (let count = 0; count < maxElements; count++) {
    // random number generator, sorta
    arr.push(Math.floor((Math.random() * Math.pow(10, 20)) % maxValue));
  }
  let sampleSet = new Set([...arr]);
  return sampleSet;
}

function NewNode(data, left, right) {
  return { data, left: left || null, right: right || null };
}

function TreeFactory(arr) {
  // sort and unique-ify the array and remove values below 1
  let sortedArr = [...new Set(arr)]
    .sort((a, b) => a - b)
    .filter((num) => num > 0);

  // make the tree!
  let treeRoot = buildTree(sortedArr);

  function buildTree(array, start = 0, end = array.length - 1) {
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
      // check if callback was provided
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
    // console.log('Value not in Tree.');
    return null;
  }

  function insertNode(value, root = treeRoot) {
    // preserve the structure of the tree
    // check if value exists
    if (root === treeRoot && find(value) !== null) {
      console.log('Value found, please insert a unique value.');
      return null;
    }
    // can insert if no child
    if (value < root.data) {
      if (root.left !== null) {
        return insertNode(value, root.left);
      }
      return (root.left = NewNode(value));
    }
    if (value > root.data) {
      if (root.right !== null) {
        return insertNode(value, root.right);
      }
      return (root.right = NewNode(value));
    }
  }

  function deleteNode(value, root = treeRoot, prev = treeRoot) {
    // check if value exists on first pass
    if (root === treeRoot && find(value, root) === null) {
      console.log('Value not found, nothing deleted.');
      return null;
    }
    // find data matching value
    if (root.data === value) {
      // if leaf node
      if (root.left === null && root.right === null) {
        // set child of parent to null
        root.data < prev.data ? (prev.left = null) : (prev.right = null);
        return root;
      }
      // if 2 children
      else if (root.left !== null && root.right !== null) {
        // find the next biggest node in the right subtree
        let current = root.right;
        while (current.left !== null) {
          current = current.left;
          console.log(current);
          // once the current node has no left subtree, must be next largest
        }
        // change root data
        let replacement = deleteNode(current.data);
        root.data = replacement.data;
        return root;
      }
      // else if only 1 child, not 2 or 0
      else {
        if (root.left !== null) {
          root.data < prev.data
            ? (prev.left = root.left)
            : (prev.right = root.left);
          return root;
        } else if (root.right !== null) {
          root.data < prev.data
            ? (prev.left = root.right)
            : (prev.right = root.right);
        }
        // set parent to point to current child
        return root;
      }
    }
    // if doesn't match, move along
    if (value < root.data && root.left !== null) {
      return deleteNode(value, root.left, root);
    }
    if (value > root.data && root.right !== null) {
      return deleteNode(value, root.right, root);
    }
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

  // pass in a node, or the value of the node
  function height(root = treeRoot) {
    if (root === null) {
      return 0;
    }
    // convert initial value into the node if it exists
    if (typeof root === 'number') {
      root = find(root);
    }
    // found the node, initialize heights to -1 (works because +1 to max later)
    let leftHeight = -1;
    let rightHeight = -1;
    // get height of the left subtree
    if (root.left !== null) {
      // get height of the left subtree
      leftHeight = height(root.left);
    }
    if (root.right !== null) {
      // get height of the right subtree
      rightHeight = height(root.right);
    }
    // if root has no children, return the greater height
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }

  function isBalanced(root = treeRoot) {
    // callback for traversal, the fn needs a value
    function _compareHeight(value) {
      // convert value into a node
      const currentNode = find(value);
      // get height of child nodes
      let lheight = height(currentNode.left);
      let rheight = height(currentNode.right);
      if (Math.abs(lheight - rheight) > 1) {
        return false;
      }
      return true;
    }
    // get an array populated with whether each visited node is balanced
    let nodeBalanceArr = inOrder(_compareHeight);
    // if resulting array contains any false, return false
    return !nodeBalanceArr.includes(false);
  }

  function reBalance() {
    // use preOrder traversal to sort values into an array
    let newArr = preOrder();
    treeRoot = buildTree(newArr);
    console.log('Tree has been rebalanced.');
    return treeRoot;
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

  return {
    buildTree,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    find,
    insertNode,
    deleteNode,
    depth,
    height,
    isBalanced,
    reBalance,
    prettyPrint,
    treeRoot,
  };
}

/* Driver Functions */

// const tree = TreeFactory(sample);
// const tree = TreeFactory(createSimpleSample(30));
const tree = TreeFactory(createSampleSet(30, 100));
tree.prettyPrint(tree.treeRoot);

console.log(tree.isBalanced());
console.log(tree.levelOrder());

console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

tree.insertNode(101);
tree.insertNode(111);
tree.insertNode(112);
tree.insertNode(113);
tree.insertNode(114);
tree.insertNode(115);
tree.insertNode(116);
tree.insertNode(117);
tree.insertNode(118);

console.log(tree.isBalanced());
tree.reBalance();
console.log(tree.isBalanced());

console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
