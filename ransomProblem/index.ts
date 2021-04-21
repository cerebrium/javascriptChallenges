/* 
  Prompt: given a word, and an assortment of letters (magazine) can you form the word with the letters
    1. rules:
      a. the letters can only be used once

*/

/*
  Steps:
    1. data structures
      a. array
      b. string

    2. make a function with the two requisite parameters
      a. returns a boolean
      b. loop through array and find if the letter is present
        1. if yes:
          a. remove the letter from the array
          b. continue
        2. if no:
          a. return false

    3. efficiency thoughts
      a. looping through each time is inneficient
        1. options:
          a. make a hash map (object)
          b. O(1) - very fast
          c. with one loop through, so O(n) + O(1)*n versus O(m*n) for loop strategy

*/

// interface for the object needs to be 'loose' since its dynamic
  // plan is to save the number of occurences of the letter in the array
  interface LooseObject {
    [key: string]: number
  }
  
  // make the function with the correct parameters
  const ransomSolution = (word: string, magazine: Array<string>): boolean => {
  
    // clean the string
    word = word.replace(/\s/gm, '')
    
    // don't need to clean the array
  
    // make the object for later reference
    let magazineHashMap: LooseObject = {}
  
    // build the object structure
    magazine.forEach((letter) => {
      // map the letter to the key on the object and either increment or create the value
      magazineHashMap.hasOwnProperty(letter) ? magazineHashMap[letter] += 1 : magazineHashMap[letter] = 1
    })
  
    // loop through the word and check for the occurence of the letter in the hashmap
      // 1. if found: 
        // a. decrement the object value, and if decremented to 0, delete it
        // b. if not found, return false
    for (let i = 0; i < word.length; i++) {
      if (magazineHashMap.hasOwnProperty(word[i])) {
        if (magazineHashMap[word[i]] > 1) {
          magazineHashMap[word[i]] -= 1
        } 
        else {
          delete magazineHashMap[word[i]]
        }
      } else {
        return false
      }
    }
  
    return true
  }
  
  console.log('true case: ', ransomSolution('hello', 'hello'.split('')))
  console.log('true case: ', ransomSolution('hello there world', 'hello there world'.split('')))
  console.log('false case: ', ransomSolution('hello', 'world'.split('')))
  console.log('false case: ', ransomSolution('Hello', 'hello'.split('')))