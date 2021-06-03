/*
  Prompt: establish if you can make one change to an array to make it be increasing the entire time

  Thoughts:
    1. cannot change the order of the array
    2. will require at least linear time, since every element needs to be touched

  Plan:
    1. Keep a pointer to element behind and a count of amount of elements that are in decreasing order.
      a. if the count is greater than one return false

*/
function checkAscending(array) {
    // make pointer and counter
    let counter = 0;
    let pointer = array[0];
    // loop through and asses
    for (let i = 1; i < array.length; i++) {
        // if the pointer is less than the current index continue, else add to counter
        if (pointer > array[i]) {
            counter++;
        }
        // if the counter goes above 1, return false
        if (counter > 1) {
            return false;
        }
        // change the pointer
        pointer = array[i];
    }
    // defualt is true
    return true;
}
console.log("expecting true: ", checkAscending([4, 1, 2]));
console.log("expecting false: ", checkAscending([3, 2, 4, 1]));
//# sourceMappingURL=index.js.map