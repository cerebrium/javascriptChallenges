// find the unique
/*
  Prompt: given an array of all duplicate numbers find the one that is unique

  Thought:
    1. can do this with a hash-map
*/
// hash map creater helper function
function hashMapper(array) {
    // instantiate a hashmap
    let hash = {};
    // loop through the array and push count to found number
    array.forEach(ele => {
        // if the object has it increase count
        if (hash.hasOwnProperty(ele)) {
            hash[ele]++;
        }
        else {
            hash[ele] = 1;
        }
    });
    // return the hash
    return hash;
}
// function that takes an array of numbers
function nonDup(array) {
    // obtain hashmap of values
    let hash = hashMapper(array);
    // get the key with value 1
    for (let key in hash) {
        if (hash[key] === 1) {
            return parseInt(key);
        }
    }
}
let testArray = [4, 5, 2, 4, 1, 3, 2];
console.log(nonDup(testArray));
/*
  time-space analysis:

    Time-complexity:

      inital creation of hashmap: O(n) - linear
      finding the correct key from the hash: O(n) - linear -> in worst case scenario

  total time-complexity: O(n*2)

    Space-complexity:

      creation of hashmanp: O(n)

  total space-complexity: O(n)
*/ 
//# sourceMappingURL=code.js.map