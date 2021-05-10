// find the unique
/*
  Prompt: given an array of all duplicate numbers find the one that is unique

  Thought:
    1. can do this with a hash-map
*/

interface hashType {
  [key: number]: number
}

// hash map creater helper function
function hashMapper(array: Array<number>) {

  // instantiate a hashmap
  let hash: hashType = {}

  // loop through the array and push count to found number
  array.forEach(ele => {
    // if the object has it increase count
    if (hash.hasOwnProperty(ele)) {
      delete(hash[ele])
    } else {
      hash[ele] = 1
    }
  })

  // return the hash
  return hash
}

// function that takes an array of numbers
function nonDup(array: Array<number>): number {
  
  // obtain hashmap of values
  let hash = hashMapper(array)

  // get the key with value 1
  for (let key in hash) {
    if (hash[key] === 1) {
      return parseInt(key)
    }
  }
}

let testArray: Array<number> = [4, 5, 2, 4, 1, 3, 2]

console.log(nonDup(testArray))

/*
  time-space analysis:

    Time-complexity: 

      inital creation of hashmap: O(n) - linear

  total time-complexity: O(n)

    Space-complexity:

      creation of hashmanp: O(n)

  total space-complexity: O(n)    
*/