// set up the interface for the node
interface LLNode {
  value: number
  next: LLNode | null
}

// make a helper function for creating nodes
function nodeMaker(inputValue: number): LLNode {
  let localNode: LLNode = {
    value: inputValue,
    next: null
  }

  return localNode
}

// summing helper function
const nodeSummer = (n1: LLNode, n2: LLNode): number => {
  // check for null
  if (n1 === null && n2 !== null) {
    return n2.value
  }
  if (n1 !== null && n2 === null) {
    return n1.value
  }
  return n2.value + n1.value
}

// function to loop through the list and add the nodes
function listSummer(n1: LLNode, n2: LLNode): LLNode {
  // make the node to return
  let headNode = nodeMaker(0)

  // reference to current node
  let currentNode = headNode
  
  // loop through and determine if there is a next
  while (n1.next !== null || n2.next !== null) {
    // check if the sum is geater than 9
    if (nodeSummer(n1, n2) > 9) {
      
      // if the sum is greater than n, add one to current value
      currentNode.value += 1
      
      // add the rest of the value to the next node
      currentNode.next = nodeMaker(nodeSummer(n1, n2) - 10)
      
      // set reference for current node
      currentNode = currentNode.next
      
    } else {
      // set the current node value to sum of the two
      currentNode.next = nodeMaker(nodeSummer(n1, n2))
      
      // make the next node
      currentNode = currentNode.next
    }
    
    // incease each node
    n1 = n1.next
    n2 = n2.next
  }

  // handle the final node
  if (nodeSummer(n1, n2) > 9) {

    // if the sum is greater than n, add one to current value
    currentNode.value += 1

    // add the final node
    currentNode.next = nodeMaker(nodeSummer(n1, n2) - 10)

  } else {
    // set the current node value to sum of the two
    currentNode.next = nodeMaker(nodeSummer(n1, n2))
  }

  // return the inital node for the new linked list
  return headNode
}

// function for displaying the sum
const displaySum = (finalList: LLNode): string => {
  let returnString = ''

  // loop through list and concat each number
  while (finalList.next) {
    returnString += finalList.value
    finalList = finalList.next
  }

  // get the final node
  returnString += finalList.value

  // return the sum
  return returnString
}

// make two linked lists to practice with
let LLOne = nodeMaker(8)
LLOne.next = nodeMaker(9)
LLOne.next.next = nodeMaker(3)

let LLTwo = nodeMaker(4)
LLTwo.next = nodeMaker(5)
LLTwo.next.next = nodeMaker(6)

console.log(displaySum(listSummer(LLOne, LLTwo)))
