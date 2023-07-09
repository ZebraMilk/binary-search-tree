Given a sorted integer array of length n

height of left and right subtree differ by at most 1
left subtree is balanced
right subtree is balanced

`[1, 2, 3, 4, 5, 6, 7]`

![[Pasted image 20230709172324.png]]

root node is the middle of the sorted array

root of each subtree is the middle of each half of the sorted array

Algorithm for solving:

![[Pasted image 20230709172438.png]]

## Algorithm

Pseudo: 

1. Init start = 0, end = lenth of array - 1
2. middle = (start + end)/2
3. create a tree node with middle as root (let A)
4. recursively do the following steps:
  1. calculate middle of left subarray
  2. make it root of left subtree
  3. calculate middle of right subarray
  4. make it root of right subtree

``` JS
createBST(array, start, end) {
  // if we've moved past the end of the array, point to nothing
  if (start > end) retrun null;
  // account for fractions
  let middle = Math.floor((start + end) / 2);
  root = newNode(array[middle])
  root.left = createBST(array, start, middle - 1);
  root.right = createBST(array, middle + 1, end);

  return root;
}
```
