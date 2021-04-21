/*
    for creating nodes to test
    1. make a class with
        a. left -> value that is less than the node value
        b. right -> value that is greater than the node value
        c. value -> the objects value

*/

class NodeClass {
    constructor(value, left=null, right=null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

/*
    make a class with two functions
        1. the function that we call that returns the recursive function

        2. the 'helper' that recursively calls itself to check left and right trees

*/

class BSTChecker {

    // make a helper function that can pass down the low and high values
    isValidHelper(n, low, high) {

        // if there isn't a node its a valid
        if (!n) {
            return true
        }

        // set the val for easier referencing
        let val = n.value

        // check if low < value < high
        if (
            
            // check main node
            (val > low && val < high) &&
            
            // check left node
            (this.isValidHelper(n.left, low, val)) &&

            // check right node
            (this.isValidHelper(n.right, val, high))
            
            ) {

            // all conditions met
            return true
        }

        // implicit 'else'
        return false
    }

    // recuresive creator
    isValid(n) {
        return this.isValidHelper(n, -Infinity, Infinity)
    }
}

/*
    test the solution
    1. make a test node, true and false
    2. make a solution class
        a. call the method on the test nodes

*/

// true case
let testTrueNode = new NodeClass(5)
testTrueNode.left = new NodeClass(4)
testTrueNode.right = new NodeClass(7)
testTrueNode.right.left = new NodeClass(6)
testTrueNode.right.right = new NodeClass(8)


// false case
let testFalseNode = new NodeClass(1)
testFalseNode.left = new NodeClass(2)
testFalseNode.right = new NodeClass(3)

// instantiate bst checker class case
let bstChecker = new BSTChecker()

console.log('true test: ', solution.isValid(testTrueNode), '\n',  'false test: ', solution.isValid(testFalseNode))