/*
  Prompt: reverse a linked list

  Steps: 
    1. since we don't know the length, a recursive solution seems problematic for overflowing the stack
    2. iterative solutions is prefered then, will need pointers to handle this
      a. two pointers
        1. first to two behind
        2. second to one behind

*/

// make a node interface
interface LLNode {
  value: number
  next: LLNode | null
}

// make a linked list helper function
function LLHelper(inputValue: number, nextNode: LLNode): LLNode {

  // instantiate the node
  let localNode: LLNode = {
    value: inputValue,
    next: nextNode ? nextNode : null
  }

  // return the node
  return localNode
}

// use the helper function to make a linked list
function LLMaker(): LLNode {

  // lmake an array to test the function later
  let array: Array<number> = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  
  // make a pointer so can point each node
  let pointer: LLNode = null

  // loop through the array and make a list
  array.forEach(ele => {

    // make the next node
    let nextNode = LLHelper(ele, pointer)

    // make the node and change the pointer
    pointer = nextNode

  })

  // return the head
  return pointer
}

// function to help us see the linked list
function readTheLL(head: LLNode): Array<number> {

  // instantiate the array to return
  let array: Array<number> = []

  // make a pointer for looping
  let pointer = head

  // loop through the nodes and place values in the array
  while (pointer.next) {

    // place value in array
    array.push(pointer.value)

    // grab next node
    pointer = pointer.next
  }

  // get the last value
  array.push(pointer.value)

  // return the array
  return array
}

// -------------------------------------------------------//
// handle reversing the array
function reverseLL(head: LLNode): LLNode {

  // pointer to two behind
  let twoBehind: LLNode = null

  // pointer to one behind
  let oneBehind: LLNode = null

  // make a pointer
  let pointer = head

  // loop through the nodes and reverse the order
  while (pointer.next) {

    // check if one behind is null
    if (oneBehind === null) {

      // CASE: Inital only pointer and no one or two behind
      oneBehind = pointer

      // change pointer
      pointer = pointer.next

    }
        
    // check if two behind is null
    if (twoBehind === null && oneBehind !== null) {

      // CASE: one behind is filled, two isn't

      // change two behind
      twoBehind = oneBehind

      // change one behind
      oneBehind = pointer

      // change the pointer
      pointer = pointer.next

      // set the tail to be null
      twoBehind.next = null

    }

    // both the pointers are filled now

    if (oneBehind !== null && twoBehind !== null) {
  
      // make the switch
      oneBehind.next = twoBehind
  
      // change one behind to be two
      twoBehind = oneBehind
  
      // change one behind to be current
      oneBehind = pointer
  
      // change pointer
      pointer = pointer.next
    }
  }

  // everything is reversed besides the last two
  // have to check for case that only 2 elements in linked list
  if (oneBehind !== null && twoBehind !== null) {
    // change next's
    oneBehind.next = twoBehind
    pointer.next = oneBehind

  }

  if (oneBehind !== null && twoBehind === null) {
    // CASE: Linked list is two nodes
    pointer.next = oneBehind
  }

  // return the new head
  return pointer
}

console.log("Forwards: ", readTheLL(LLMaker()))
console.log("Backwards: ", readTheLL(reverseLL(LLMaker())))

/*  
  Space-Time Complexity: 
    Space: two nodes => barely anything

    Time: Linear => one pass through the list
    
    Result: O(N) => linear

*/