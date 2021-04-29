let testArray: Array<number> = [1, 2, 3, 4, 5]

// thoughts about this

// prompt
/*
  given an array of numbers, return every permutations of the numbers that is possible
*/

/*
  could use a double loop of some kind
  could perhaps be better to look into a linked list solution

  1. make a linked list
  change the head each time
  iterate through by shifting everything one to the right

  2. better way save an array of index options

  // there does not occur to me a way to do this without double looping .... will now check the answer on the techSeries!
*/

// function that handles producing the final array
function permutations(array: Array<number>): Array<Array<number>> {
  // make array to return
  let returnArray = []

  
  // loop through array and add the permutations
  array.forEach((number, numberId) => {
    // make an array of all the indices
    let indexOptions: Array<number> = Array.from(Array<number>(array.length).keys()).filter(ele => ele !== numberId)

    // double loop
    for (let i = 0; i < array.length; i++) {
      // if the number is not the current iterate of the forEach, increment the indexOptions
      if (i !== numberId) {

        // map the second portion of the array to the first number
        let postArray = indexOptions.map(ele => {

          // return the number
          return array[ele]
        })

        // change the order of the index array
        indexOptions.push(indexOptions[0])
        indexOptions.shift()
        
        // for each of the length of the array push the options array
        returnArray.push([number, ...postArray])

      }
    }

  })

  return returnArray

}

console.log(permutations(testArray))