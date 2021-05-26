
/* Steps
  1. if the letter exists (hashtable is faster)
    a. find its neighbors
    b. determine if the next letter is a neighbor
      - continue for the length of the word
      - if found return exists

*/

/*   -------------- solving the problem --------------- */

// make an array of letters
let letterArray: Array<string> = ['F', 'A', 'C', 'I', 'O', 'B', 'Q', 'P', 'A', 'N', 'O', 'B', 'M', 'A', 'S', 'S']

const visitedArray: Array<string> = []

interface HashTable {
  [key: string] : Array<number>
}

// make a hashtable of the array of letters
const hashMaker = (array: Array<string>): HashTable => {
  // instantiate the hashtable
  let hash: HashTable = {}

  // loop through and make the hash
  array.forEach((letter, letterId) => {
    if (hash.hasOwnProperty(letter)) {
      // add the index of duplicate
      hash[letter].push(letterId)
    } else {
      // make array of where to find it
      hash[letter] = [letterId]
    }
  })

  // return the hash
  return hash
}

// hash to update as available
const checkHash: HashTable = hashMaker(letterArray)

// hash to used as visited
const visitedHash: HashTable = {}

// function for finding closest relative
const closestRelative = (index: number, indexArray: Array<number>) => {
  /*
    1. we want to check for up, right, left, down first
    2. then closest numerically

  */
  
  for (let i = 0; i < indexArray.length; i++) {
    // check if the index is on right or left
    // CASE: RIGHT
    if (index === 3 || index === 7 || index === 11 || index === 15) {
      // check only up left and down and up
      if (indexArray[i] === index+4 || indexArray[i] === index-4 || indexArray[i] === index - 1) {
        // found closest relative
        return indexArray[i]
      }
      // CASE LEFT
    } else if (index === 0 || index === 4 || index === 8 || index === 12) {
      // check only up right and down and up
      if (indexArray[i] === index+4 || indexArray[i] === index-4 || indexArray[i] === index + 1 ) {
        // found closest relative
        return indexArray[i]
      }
      // CASE BOTTOM
    } else if (index === 12 || index === 13 || index === 14 || index === 15) {
      // check only up left and down
      if (indexArray[i] === index+1 || indexArray[i] === index-1 || indexArray[i] === index-4 ) {
        // found closest relative
        return indexArray[i]
      }
      // CAST TOP
    } else if (index === 0 || index === 1 || index === 2 || index === 3) {
      // check only up left and down adn right
      if (indexArray[i] === index+1 || indexArray[i] === index-1 || indexArray[i] === index+4 ) {
        // found closest relative
        return indexArray[i]
      }
    } else {
      if (indexArray[i] === index+1 || indexArray[i] === index-1 || indexArray[i] === index+4 || indexArray[i] === index - 4) {
        // found closest relative
        return indexArray[i]
      }
    }
  }

  // if there are no relatives, return first index
  return indexArray[0]
}

// counter
var counter: Array<string> = []
// event listener
// when a value comes in handle finding it and highlighting it, or unhighlighting it
const updateValue = (e: Event) => {
  const { target } = e

  // grab the input
  if (target) {
    // target is a string of targets... convert it into an array ... call functions on each iterate
    let inputLetters: Array<string> = (target as HTMLInputElement).value.split("")

    // handle a letter being removed
    if (inputLetters.length < counter.length) {

      // find the latest value in the counter array
      let previousValue = counter.pop()

      // find the value in the validated array
      if (visitedHash.hasOwnProperty(previousValue)) {

        // check if it is a padded value
        if (visitedHash[previousValue][0] !== -1) {

          
          // update the highlighting
          document.getElementById(`${visitedHash[previousValue][0]}`).className = 'letterContainer'
          
          // if it isnt, remove it, add it to available array, and change the highlighting
          if (checkHash.hasOwnProperty(previousValue)) {
            // add it back in
            checkHash[previousValue].unshift(visitedHash[previousValue][0])
            
            // remove it form the visited hash
            visitedHash[previousValue].shift()
            
            // check if it needs to be deleted
            if (visitedHash[previousValue].length === 0) {

              // delete it
              delete visitedHash[previousValue]
            }
          } else {
            // make the array
            checkHash[previousValue] = [visitedHash[previousValue][0]]

            // remove it form the visited hash
            visitedHash[previousValue].shift()

            // check if it needs to be deleted
            if (visitedHash[previousValue].length === 0) {

              // delete it
              delete visitedHash[previousValue]
            }
          }
        } else {
          visitedHash[previousValue].shift()
        }
      }
    } else {
      
      // check that the case matches
      inputLetters = inputLetters.map( ele => ele.toUpperCase())
      
      // latest letter pointer
      let letter = inputLetters[inputLetters.length-1].toUpperCase()
      
      // increment the counter
      counter.push(letter)

      // check for new or deleted letter
      if (checkHash[letter]) {
        // letter exists ... check if it is close ... highlight if so
        if (inputLetters.length === 1) {
  
          // first entry, cannot check closest realtive
          // add to the visited hash
          visitedHash[letter] = [checkHash[letter][0]]
  
          // highlight the letter
          document.getElementById(`${visitedHash[letter][0]}`).className = 'highlighted'
  
          // remove from the check array
          checkHash[letter].shift()
  
          // check if it still has indices
          if (checkHash[letter].length < 1) {
  
            // delete it from existing letters
            delete checkHash[letter]
          }
        } else {
          // not the first entry ... we want to find the closest instance of the letter to allow sequential input
          if (checkHash[letter].length > 1) {
            // we know there are more than one option. check the previous entry and locate closest
            /*
              steps: 
                1. loop throuh the previous entris and find the last one that was found
                2. find the index of that 
                3. determine closest relative of available indices
            */
            // prevouis pointer
            let previousPointer: number = 0
            
            // loop through and find last entry
            for (let i = inputLetters.length - 2; i > -1; i--) {
  
              // previous entry pointer
              let previousLetter = inputLetters[i].toUpperCase()
  
              // chech the visited hash for the letter
              if (visitedHash[previousLetter]) {
                
                // check if it is a filler letter
                if (visitedHash[previousLetter][0] !== -1) {
  
                  // case that the number is not a filler
                  previousPointer = visitedHash[previousLetter][0]
  
                  // break the loop
                  i = -1
                }
              }
            }
            // find the number closest to the previous
            let relative = closestRelative(previousPointer, checkHash[letter])
  
            if (visitedHash.hasOwnProperty(letter)) {
              
              // add to the visited hash
              visitedHash[letter].unshift(relative)
  
            } else {
              visitedHash[letter] = [relative]
            }
    
            // highlight the letter
            document.getElementById(`${relative}`).className = 'highlighted'
    
            // remove from the check array
            checkHash[letter] = checkHash[letter].filter(ele => ele !== relative)
    
            // check if it still has indices
            if (checkHash[letter].length < 1) {
    
              // delete it from existing letters
              delete checkHash[letter]
            }
  
          } else {
            // highlight the letter
            document.getElementById(`${checkHash[letter][0]}`).className = 'highlighted'
          
            // chekc if the visited hash has the item
            if (visitedHash[letter]) {
              // add to the visited hash
              visitedHash[letter] = [...visitedHash[letter], checkHash[letter][0]]

            } else {
              visitedHash[letter] = [checkHash[letter][0]]
            }
    
            // remove from the check array
            checkHash[letter].shift()
    
            // check if it still has indices
            if (checkHash[letter].length < 1) {
    
              // delete it from existing letters
              delete checkHash[letter]
            }
          }
        }
  
        // case: new letter but not in the list
      } else {
        // add a -1 to the array of letter
        if (visitedHash[letter]) {

          visitedHash[letter].unshift(-1)
        }
      }
    }
  }
}

/* -------------- ui -------------------------------- */

// grab the body
const body = document.getElementById("app")

/* ------------ Add Instructions ---------------- */
let instructions = document.createElement("h2")
instructions.textContent = "Type a four letter word to find it"

body.appendChild(instructions)

/* ------------ Input Design -------------------- */

// make the input
let inputBox = document.createElement("input")
inputBox.className = "inputBox"

// append to the body
body.appendChild(inputBox)

inputBox.addEventListener('input', updateValue)

/* ------------------------- Box Design ------------- */

// create the div container
const container = document.createElement("div")

// add the classname for the container
container.className = "wordContainer"

// create the div
body?.appendChild(container)

// append 16 divs
for (let i = 0; i < 16; i++) {
  // create an inner div
  let letterContainer = document.createElement("div")

  // add classname
  letterContainer.className = "letterContainer"
  letterContainer.id = `${i}`

  // create the text
  let letter = document.createElement("h3")
  letter.textContent = letterArray[i]

  // append the letters
  letterContainer.appendChild(letter)

  // add the matrix to the body
  container.appendChild(letterContainer)
}