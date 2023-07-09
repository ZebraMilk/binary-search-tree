export default function mergeSort(arr) {
  // if 0 or 1 element, just return that value or nothing
  if (arr.length === 1) return arr;
  // if (arr.length === 0) return;

  // sort the left half
  let left = mergeSort(arr.slice(0, arr.length / 2));
  // sort the right half
  let right = mergeSort(arr.slice(arr.length / 2));
  // merge the halves together
  let merged = [];
  _merge(left, right);

  function _merge(left, right) {
    // while there are elements in each array
    while (left.length > 0 && right.length > 0) {
      // compare the first element in each
      if (left[0] < right[0]) {
        merged.push(left.shift());
      } else {
        merged.push(right.shift());
      }
    }
    while (left.length > 0) {
      merged.push(left.shift());
    }
    while (right.length > 0) {
      merged.push(right.shift());
    }
    return merged;
  }
  // return merged array
  return merged;
}
