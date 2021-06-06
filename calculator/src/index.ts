/*
  Prompt: Make a calculator that recieves a string and can handle parenthesis and + and -

  Strategy:
    - Recursive: recurses on each parenthesis
    - keeps track of signs

*/

// function to check for number in string
function isNumeric(str: string) {
  if (typeof str != "string") return false // checking for valid string

  // convert the value to a integer and determine if the int is a valid number
  return !Number.isNaN(parseInt(str))
}

function calculate(prompt: string, currentValue: number = 0, startIndex: number = 0): number {

  // remove the white space
  let newPrompt = prompt.replace(/ /g, '') 

  // first step: turn the string into an array for iteration
  let promptArray: Array<string> = newPrompt.split('')

  // the state of the number
  let numberState = "+"

  // instantiate an index
  let index = startIndex

  // loop through and either do math or call for recursion on parenthesis
  while (index < promptArray.length) {
    // handle number state
    if (promptArray[index] === "+" || promptArray[index] === "-") {
      numberState = promptArray[index]
    }

    // handle numbers
    if (isNumeric(promptArray[index])) {
      if (numberState === "+") {
        currentValue += parseInt(promptArray[index])
      } else {
        currentValue -= parseInt(promptArray[index])
      }
    }

    // handle parenthesis
    if (promptArray[index] === '(' || promptArray[index] === ')') {
      return calculate(prompt, currentValue, index+1)
    }

    // increment the index
    index ++
  }

  return numberState === "+" ? currentValue : currentValue*-1
}

console.log(calculate('(1 + (2 + (3 + (4 + 5))))'))