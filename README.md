---
aliases: 
tags: 
creation date: 2023-07-09 13:56
modification date: 2023-07-9 13:56:18
---

# Binary Search Tree

## Implementation

Given an unsorted array, form a balanced binary tree from that array and add methods as indicated by the requirements. Use only unique values in the array (or implement a "count" property of each value?)

## Definitions

Balanced Binary tree fulfills three criteria:
- The height of the left and right tree for any node does not differ by more than 1.
- The left subtree of that node is also balanced.
- The right subtree of that node is also balanced.

each node has properties like height and depth.

depth = length of the path traversed to arrive at a node

height
  of a node = length of the longest path from the node to a leaf node
  of a tree = length of the longest path from the root node to a leaf node

degree of a node = total count of the subtrees attached to the node. leaf nodes are degree = 0

root node = head or top of the tree
child node(s) = immediate successor(s) of a node
Parent node = predecessor of this node
leaf node = node without children 
level of a node = count of edges from root to node, root level = 0


### Tasks

- Sort the array
  - already implemented
- Provide sorted array to the buildTree function
  - return the root node of the tree with all the subsequent nodes populated and balanced

Should the insert/delete/find/height/depth/isBalanced/rebalance functions be methods of the Tree Factory? or separate global methods available to the other functions?

## Brainstorm

The 4 traversal functions need to take the root of a tree and return an array in the new traversal order.

If provided a callback function, they should also perform that callback on each node before inserting into the resulting array

## Order of Operations

I think I need to determine the height of a node before determining if it is balanced

### rotateTree

somehow reflect/restructure tree around nodes given new information

### buildTree

Takes an array as a parameter, sorts the array, and builds a balanced tree from that array.

Doing this recursively would set the root node to the middle value of the array
Then build the left subtree
then build the right subtree

### isBalanced

a balanced tree has leaf nodes with <=1 height difference

### reBalance

this could set a new root node, depending on the height of either tree

### insert/delete

### levelOrder(fn)

Traverses the tree breadth-first
pass each node to the fn
if no fn
return array of values
implement a queue

### in/pre/postOrder(fn)

Traverse the tree in respective depth-first order, and present each node to the fn as an argument
return array of values if no function is given

!! **Question**: What the heck do these functions do? I have the \_visit method in those traversal functions already, but... am I logging them? Building a new array of values? prettyPrinting the tree? Making a new tree?

**Answer**: https://discord.com/channels/505093832157691914/690590001486102589/1122550248515043358

seems that it should return an array of values in the order visited, but if there's a callback provided, it does something to each of the nodes before moving along. Like... printing, logging, doubling, removing, adding 1, whatever...

```JS
const tree = Tree([1, 2, 3, 4, 5, 6, 7])
const noFun = tree.levelOrder()         // -> [4, 2,  6, 1, 3,  5,  7]
const withFun = tree.levelOrder(double) // -> [8, 4, 12, 2, 6, 10, 14]

function double(value) {
  return value * 2
}
```

so n elements in the array, the nth element has left child at index 2n and right child at index 2n + 1? Have to adjust the index so the math works, arr[0] is root, but can't perform accurate math on that, so use index + 1...
4 at index 1
4.left is 1 \* 2 = arr[2] = 2
4.right is (1 \* 2) + 1 = arr[3] = 6

then 2.left is 2*2 = arr[4] = 1
2.right is 2*2 + 1 = arr[5] = 3

ahhhhh okay...

---

### Learning

What is a balanced binary tree? Starting at the root node, all the left values are less than, and all the right values are greater than, but that goes for all subtrees as well, ya?

---

## Requirements

- Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.

- Build a Tree class / factory which accepts an array when initialized. The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.

- Write a buildTree function which takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.

- Write an insert and delete functions which accepts a value to insert/delete (you’ll have to deal with several cases for delete such as when a node has children or not). If you need additional resources, check out these two articles on inserting and deleting, or this video with several visual examples.
  >You may be tempted to implement these methods using the original input array used to build the tree, but it’s important for the efficiency of these operations that you don’t do this. If we refer back to the Big O Cheatsheet, we’ll see that binary search trees can insert/delete in O(log n) time, which is a significant performance boost over arrays for the same operations. In order to get this added efficiency, your implementation of these methods should traverse the tree and manipulate the nodes and their connections.

- Write a find function which accepts a value and returns the node with the given value.

- Write a levelOrder function which accepts another function as a parameter. levelOrder should traverse the tree in breadth-first level order and provide each node as the argument to the provided function. This function can be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no function is given. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (as you saw in the video).

- Write inorder, preorder, and postorder functions that accept a function parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument. The functions should return an array of values if no function is given.

- Write a height function which accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.

- Write a depth function which accepts a node and returns its depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.

- Write a isBalanced function which checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.

- Write a rebalance function which rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.

### Tie it all together

Write a simple driver script that does the following:

- Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it, if you wish.
- Confirm that the tree is balanced by calling isBalanced.
- Print out all elements in level, pre, post, and in order.
- Unbalance the tree by adding several numbers > 100.
- Confirm that the tree is unbalanced by calling isBalanced.
- Balance the tree by calling rebalance.
- Confirm that the tree is balanced by calling isBalanced.
- Print out all elements in level, pre, post, and in order.









