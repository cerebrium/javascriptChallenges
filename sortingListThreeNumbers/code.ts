/*
 prompt:
  sort an array with three numbers in it... in place

  1. make three pointers, loop through and splice/increment

   -- faster to just have one pointer I think

*/


let unsortedArray: Array<number> = [1, 3, 2, 3, 2, 1, 2, 1, 2, 3, 2, 3, 2, 1]

function sortTheArray(array: Array<number> ) {

  let onePointer = 1

  // take the array and loop through it and place the numbers according to the pointers
  unsortedArray.forEach((ele, eleId) => {
    switch (ele > 0) {
      case ele === 1:
        // remove the element from the array
        array.splice(eleId, 1)

        // place it at the begining
        array.unshift(ele)

        // increment the pointer for ones
        onePointer++

        break;
      
      case ele === 2:
        // remove the element from the array
        array.splice(eleId, 1)

        // place after the ones
        array.splice(onePointer, 0, ele)

        break;
      
      case ele === 3:
        // remove the element from the array
        array.splice(eleId, 1)

        // place at the end of the array
        array.push(ele)

        break;
      default:
        break;
    }

    
  })
  // return the sorted array
  return array
}

console.log(sortTheArray(unsortedArray))