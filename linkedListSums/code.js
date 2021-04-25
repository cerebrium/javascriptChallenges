// make a helper function for creating nodes
function nodeMaker(inputValue) {
    var localNode = {
        value: inputValue,
        next: null
    };
    return localNode;
}
// summing helper function
var nodeSummer = function (n1, n2) {
    // check for null
    if (n1 === null && n2 !== null) {
        return n2.value;
    }
    if (n1 !== null && n2 === null) {
        return n1.value;
    }
    return n2.value + n1.value;
};
// function to loop through the list and add the nodes
function listSummer(n1, n2) {
    // make the node to return
    var headNode = nodeMaker(0);
    // reference to current node
    var currentNode = headNode;
    // loop through and determine if there is a next
    while (n1.next !== null || n2.next !== null) {
        // check if the sum is geater than 9
        if (nodeSummer(n1, n2) > 9) {
            // if the sum is greater than n, add one to current value
            currentNode.value += 1;
            // add the rest of the value to the next node
            currentNode.next = nodeMaker(nodeSummer(n1, n2) - 10);
            // set reference for current node
            currentNode = currentNode.next;
        }
        else {
            // set the current node value to sum of the two
            currentNode.next = nodeMaker(nodeSummer(n1, n2));
            // make the next node
            currentNode = currentNode.next;
        }
        // incease each node
        n1 = n1.next;
        n2 = n2.next;
    }
    // handle the final node
    if (nodeSummer(n1, n2) > 9) {
        // if the sum is greater than n, add one to current value
        currentNode.value += 1;
        // add the final node
        currentNode.next = nodeMaker(nodeSummer(n1, n2) - 10);
    }
    else {
        // set the current node value to sum of the two
        currentNode.next = nodeMaker(nodeSummer(n1, n2));
    }
    // return the inital node for the new linked list
    return headNode;
}
// function for displaying the sum
var displaySum = function (finalList) {
    var returnString = '';
    // loop through list and concat each number
    while (finalList.next) {
        returnString += finalList.value;
        finalList = finalList.next;
    }
    // get the final node
    returnString += finalList.value;
    // return the sum
    return returnString;
};
// make two linked lists to practice with
var LLOne = nodeMaker(8);
LLOne.next = nodeMaker(9);
LLOne.next.next = nodeMaker(3);
var LLTwo = nodeMaker(4);
LLTwo.next = nodeMaker(5);
LLTwo.next.next = nodeMaker(6);
console.log(displaySum(listSummer(LLOne, LLTwo)));
