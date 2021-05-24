/*
  prompt: given a number, use the digits within the number to find the next highest number
  Ex: 11121 -> 11211

  Thoughts:
    1. Find all permutations of these numbers
    2. find index if the input number (binary search)
    3. if index+1 return it, else return input

*/

const permuteCopy = (inputArray: Array<string>) => {

  // make results array to return
  let results: Array<number> = []
  
  // recursive function
  function permutations(array: Array<string> = [], transientArray: Array<string> = []) {

    // make a pointer to the transient array
    let pointer: Array<string> = transientArray

    // loop through and remove one number from the array and add it to the transient
    for (let i = 0; i < array.length; i++) {

      // move one from array to transient array
      pointer = array.splice(i, 1)

      // check if we have reached the end of the array
      if (array.length === 0) {
        // add the copied array and the last index from teh array to the results list
        results.push(parseInt([...transientArray, ...pointer].join("")))
      }

      // if we havent reached the end of the array, need to recurse again
      permutations(array.slice(), transientArray.concat(pointer))

      // make the array have the initial for the array again
      array.splice(i, 0, pointer[0])
    }

    return results
  }

  return permutations(inputArray)
}

// used binary search to find the number given
function binarySearch(array: Array<number>, target: number, index = 0): any {

  // recursive function ... find the middle ... reduce array size until found
  if (target < array[Math.floor(array.length / 2)]) {

    // target is lower than the middle ... call function with lower half
    return binarySearch(array.slice(0, Math.floor(array.length / 2)), target, index)

  } else if (target > array[Math.floor(array.length / 2)]) {

    // target is higher ... add the deleted array to the index
    index += Math.floor(array.length / 2)

    // call the function
    return binarySearch(array.slice(Math.floor(array.length / 2), array.length), target, index)
  } else {

    // number found ... return the index
    return index + Math.floor(array.length / 2)
  }
}

// final function
function main(targetNumber: number): number {

  // get rid of duplicates
  let permutations = permuteCopy((targetNumber).toString().split(""))
  let permutationSet = new Set(permutations)

  // now that there are all the possible permutations, sort it (preferably quicksort)
  let sortedPermutations = Array.from(permutationSet).sort((a, b) => (a > b ? 1 : -1))

  // index of number
  let index = binarySearch(sortedPermutations, targetNumber)+1

  if (index < sortedPermutations.length-1) {
    return sortedPermutations[index]
  } else {
    return targetNumber
  }
}

console.log(main(11121))
console.log(main(53631))


