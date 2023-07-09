// left and right "pointers" are the index of the next node in the tree
let tree = [
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

// takes root node of the tree
let result = [];
function preOrder(root) {
    // root
    result.push(root.value);
    // left subtree
    if (root.leftNode !== null) {
        preOrder(tree[root.leftNode]);
    }
    // right subtree
    if (root.rightNode !== null) {
        preOrder(tree[root.rightNode]);
    }
}

preOrder(tree[0]);
console.log(result.join(' '));

result = [];

function inOrder(root) {
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

result = [];
function postOrder(root) {
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

postOrder(tree[0]);
console.log(result.join(' '));
