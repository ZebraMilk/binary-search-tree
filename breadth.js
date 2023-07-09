// make a queue
const queue = {
  discoveredNodes: [],
  empty: function () {
    if (this.discoveredNodes[0] === undefined) return true;
    else return false;
  },
};

// breadth-first traversal function, takes a binary tree as input
// could just take the root node of a tree as input...
function levelOrder(fn) {
  let result = [];

  // push the root node onto the tree
  queue.discoveredNodes.push(root);

  // repeat until queue is empty
  while (!queue.empty()) {
    // remove the front of the queue (dequeue the task)
    let current = queue.discoveredNodes.shift();
    // check for left/right children
    if (current.leftNode !== null) {
      _discover(current.leftNode);
    }
    if (current.rightNode !== null) {
      _discover(current.rightNode);
    }
    if (fn) fn(current);
    else {
      _visit(current);
    }
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

export default levelOrder;
