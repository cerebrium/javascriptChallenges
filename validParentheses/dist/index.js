/*
  Prompt: given a variety of brackets, determine if theyre valid or not

  Plan:
    make a helper function that creates nodes to push to the stack
    iterate through the stack as go and determine if the closing brackets match the opening ones

  DS: strings : stack

  algo: loop

  Time-Space:
    Time: O(n)
    Space: O(n) -> stack
*/
class parenChecker {
    constructor() {
        // stack
        this.stack = [];
        // determine opening
        this.matchObj = {
            '(': ')',
            '{': '}',
            '[': ']'
        };
        // opening determinate
        this.openings = ['(', '{', '['];
    }
    stackMaker(opening, closing) {
        // make the stack node
        let localNode = {
            value: opening,
            matching: closing
        };
        // return the stack node
        this.stack.unshift(localNode);
    }
    // call the stack maker on each input and push or pop accordingly
    validParenthesis(input) {
        // loop through each item in the string and create the stack
        for (let i = 0; i < input.length; i++) {
            // check for correct symbol
            if (this.openings.indexOf(input[i]) >= 0) {
                // if opening add to stack
                this.stackMaker(input[i], this.matchObj[input[i]]);
            }
            else {
                // check the stack to see if it matches
                if (this.stack[0].matching !== input[i]) {
                    // the symbols don't match return false
                    return false;
                }
                else {
                    // they match, pop off the stack
                    this.stack.shift();
                }
            }
        }
        return true;
    }
}
// test the functions
let testArray = '()[{()}]';
let testArrayFalse = '([)';
let checker = new parenChecker;
console.log("expecting true: ", checker.validParenthesis(testArray));
console.log("expecting false: ", checker.validParenthesis(testArrayFalse));
//# sourceMappingURL=index.js.map