// left and right "pointers" are the index of the next node in the tree
let fakeTree = [
  { value: 'F', leftNode: 4, rightNode: 9 },
  { value: 'A', leftNode: null, rightNode: null },
  { value: 'B', leftNode: 1, rightNode: 3 },
  { value: 'C', leftNode: null, rightNode: null },
  { value: 'D', leftNode: 2, rightNode: 5 },
  { value: 'E', leftNode: null, rightNode: null },
  { value: 'G', leftNode: null, rightNode: 8 },
  { value: 'H', leftNode: null, rightNode: null },
  { value: 'I', leftNode: 7, rightNode: null },
  { value: 'J', leftNode: 6, rightNode: 10 },
  { value: 'K', leftNode: null, rightNode: null },
];

// mimic a queue from C lib in video
const queue = {
  discoveredNodes: [],
  empty: function () {
    if (this.discoveredNodes[0] === undefined) return true;
    else return false;
  },
};

// breadth-first traversal function, takes a binary tree as input
// could just take the root node of a tree as input...
function levelOrder(tree) {
  let result = [];

  // push the root node onto the tree
  queue.discoveredNodes.push(tree[0]);

  // repeat until queue is empty
  while (!queue.empty()) {
    // remove the front of the queue (dequeue the task)
    let current = queue.discoveredNodes.shift();
    // check for left/right children
    if (current.leftNode != null) {
      _discover(tree[current.leftNode]);
    }
    if (current.rightNode != null) {
      _discover(tree[current.rightNode]);
    }
    _visit(current);
  }

  console.log(result.join(' '));

  return result;

  // enqueue
  function _discover(node) {
    queue.discoveredNodes.push(node);
  }

  // dequeue
  function _visit(node) {
    result.push(node.value);
  }
}
