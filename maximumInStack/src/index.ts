/*
   Prompt: make a stack that at any point can return a maximum in the stack

   Steps:
    1. create the data structure
      a. stack
    2. add the max() function to the struct

*/

// make the data structure
  // the stack is: an array of objects inside a class

interface stackObj {
  value: number
}

// stack class
class stack {

  // field
  stackObject: stackObj

  // store the max here
  maxArray: Array<number> = []

  // make the stack here
  stackContainer: Array<stackObj> = []

  // add a method for adding the objects
  push(stackObject: stackObj) {

    // add the object to front of stack
    this.stackContainer.unshift(stackObject)

    // add the number if its higher to the max array
    if (this.maxArray.length === 0) {

      // if there isnt a max just add anything
      this.maxArray.push(stackObject.value)
    } else {

      // if there are items in the stack
      if (this.maxArray[this.maxArray.length - 1] <= stackObject.value) {
        // if the added value is heigher or equal add the object
        this.maxArray.push(stackObject.value)
      }
    }

    // return new stack
    return this.stackContainer
  }

  // method for removing objects
  pop() {

    if (this.stackContainer.length > 0) {
      // handle the max array
      if (this.stackContainer[0].value >= this.maxArray[this.maxArray.length - 1]) {

        // remove the item from the max
        this.maxArray.pop()
      }
  
      // remove object from front of stack
      this.stackContainer.shift()
    }

    // return stack
    return this.stackContainer
  }

  // function for grabbing the max
  max(): number | null {
    // check for items in max
    if (this.maxArray.length > 0) {
      // return the last index
      return this.maxArray[this.maxArray.length - 1]
    } else {
      // no items, return null
      return null
    }
  }
}

// make the stack
var Stack = new (stack)
Stack.push({value: 1})
Stack.push({value: 2})
Stack.push({value: 3})
Stack.push({value: 2})
Stack.push({ value: 1 })

console.log("should return 3: ", Stack.max())

// remove three items
Stack.pop()
Stack.pop()
Stack.pop()

console.log("should return 2: ", Stack.max())