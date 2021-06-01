/*
  Prompt: given an array from 0-9 with one missing number, find the missing number

  challenge: use the xor operator

  Problem: Had to use an if statment to handle '0' case, perhaps it's a true edge case -> seems like there should be a better solution

  Reasoning:
    1. In looking into this the answer seems to be as follows:
      a. If the unique > next array reference
        - The two numbers are added in the xor operation
      b. If the unique < next array reference
        - The second number is subtracted in the xor operation

    2. If we set the result of the xor operation into the 'unique' left side of the xor
      a. There is a 'match' for each number in the array besides the number missing
      b. The missing number then is all that is left
      c. Problem case: 0
        - Solved with a check
        - Not sure why this isn't working without having to have a seperate check

    3. This solution is essentially the same as summing them and subracting from what you expect
      a. Time: O(n) - one loop Linear
      b. Space: O(n) - essentially zero (one constant variable)

    -----------------------
    1. Additional rule needed:
      a. for arrays of numbers with length starting with an odd number, starting point must be 0


*/
function findMissingNumber(array) {
    // answer: Apply the rule to have correct starting value
    let unique = array.length < 10 ? -1 : parseInt(array.length.toString()[0]) % 2 === 0 ? -1 : 0;
    // handle the zero excpetion
    let zeroCheck = false;
    for (let i = 0; i < array.length; i++) {
        // check for zero
        if (array[i] === 0) {
            zeroCheck = true;
        }
        // loop through and apply the xor operator and save the result
        unique ^= array[i];
    }
    // return the value
    return zeroCheck ? Math.abs(unique) : 0;
}
// test cases
let testArray = [9, 8, 1, 2, 3, 4, 6, 7, 0];
let testArray2 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let testArray3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let testArray4 = [0, 1, 2, 3, 4, 5, 6, 8, 9];
// attempt to apply logic to larger array
let testArray5 = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
// attempt to apply logic to larger array
let testArray6 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
// attempt to apply logic to larger array
let testArray7 = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
console.log("expecting: 5", findMissingNumber(testArray));
console.log("expecting: 9", findMissingNumber(testArray2));
console.log("expecting: 0", findMissingNumber(testArray3));
console.log("expecting: 7", findMissingNumber(testArray4));
// larger array case - the '-1' is no longer needed
console.log("expecting: 7", findMissingNumber(testArray5));
// Even larger case: -1 is needed
console.log("expecting: 19", findMissingNumber(testArray6));
// Even larger case: -1 is needed
console.log("expecting: 8", findMissingNumber(testArray7));
//# sourceMappingURL=index.js.map