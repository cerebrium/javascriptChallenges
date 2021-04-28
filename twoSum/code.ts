/*
    1. make a hashtable for the numbers in the array
    2. see if the numbers required are present 
    3. return the index of the requisite numbers
*/ 

// interface for the type of values to be saved
interface HashTableModel {
  present: Boolean,
  index: number
}

// interface for the overall hashmap
interface HashMap {
  [key: number]: HashTableModel
}

// for a cleaner 'pass' in the turnery 
var pass = null

// function that returns the hashtable for the array
function returnHash(inputArray: Array<number>): HashMap {

  // instantiate the map to return
  let localHashMap: HashMap = {}

  // loop through the numbers and map the values
  inputArray.forEach((ele, eleId) => {
      localHashMap.hasOwnProperty(ele) ? pass : localHashMap[ele] = {
          present: true,
          index: eleId
      }
  })

  // return the object
  return localHashMap
}

// make a function that loops through the object and detemines best matches
function twoSum(inputArray: Array<number>, inputNumper: number): Array<number> {

  // array to populate
  let returnArray: Array<number> = []

  // make the hashtable
  let localHash = returnHash(inputArray)

  // loop through the array and find the matching numbers
  for (let i = 0; i < inputArray.length; i++) {
      // check if the pair exists
      if (localHash.hasOwnProperty(inputNumper-inputArray[i])) {

          // return the array if found
          return [i, localHash[inputNumper-inputArray[i]].index]
      }
  }


  // return the final array
  return returnArray
}

let testArray = [2, 7, 11, 15]
console.log(twoSum(testArray, 18))