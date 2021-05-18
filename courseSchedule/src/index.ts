/*
  Prompt: given a matrix of numbers:
    1. first number is the course
    2. second array is list of prerequisites
      a. Determine if the prerequisites are circular

  Data Structure:
    1. Graph (object [key: number]: array<number>)

    Time Complexity: If I am able to implement the caching structure O(N)
    Space Complecity: Linear -> one hashmap )(N)
*/

var pass: null = null;

interface HashMap {
  [key: number]: Array<number>
}

// custom array tuplr type
type tuple = [number, Array<number>]

// Step one determine the data structure and make a function for creating it
class CourseScheduler {
  // make the property
  private classList: Array<tuple> = [];

  // make a method for turning the matrix into our graph
  private hashMapper(classNumber: number, preRequisites: Array<number>, hash: HashMap): HashMap {
    // check the object for the index of the class
    if (hash.hasOwnProperty(classNumber)) {

      // if it does, add the pre-requisites to the array
      hash[classNumber] = [...hash[classNumber], ...preRequisites]
    } else {
      // make the class key
      hash[classNumber] = [...preRequisites]
    }

    // return the updated hashmap
    return hash
  }

  // function for checking the graph
  private viableSchedule(): boolean {
    let returnVal: boolean = true

    // instantiate the hashmap
    let hash: HashMap = {};

    // loop through and make a hashmap
    this.classList.forEach(ele => {
      if (returnVal) {
        // update the hash
        hash = this.hashMapper(ele[0], ele[1], hash)
  
        // after updating hash check if the class schedule is acceptable
        ele[1].forEach(prereq => {
  
          // check if there is an array for the prereqs
          if (hash.hasOwnProperty(prereq)) {
            // if the prereq array includes the class
            if (hash[prereq].find(innerEle => innerEle === ele[0]) !== undefined) {
  
              // return false
              returnVal = false
            }
          }
        })
      }
    })

    // return the result
    return returnVal
  }

  // function for making classes
  classMaker(classNumber: number, preRequisites: Array<number>) {
    // take the values and update the internal classlist
    this.classList.push([classNumber, preRequisites])
  }

  // edit the class list
  classEdit(index: number, classNumber: number, preRequisites: Array<number>) {
    // check if the index exists
    this.classList[index] ? this.classList[index] = [classNumber, preRequisites] : pass;

    // return updated class list
    return this.classList
  }

  // view the classes
  classViewer() {
    // show the class list
    return this.classList
  }

  // check for viable schedule or not
  check(): string {
    if (this.viableSchedule()) {
      return "This class list is viable"
    }
    return "Class list is not viable"
  }

}

// instantiate the class list
let classList = new CourseScheduler()

// add some classes
classList.classMaker(1, [0])
classList.classMaker(0, [1])

// view the list
console.log(classList.check())

// change to make them acceptable
classList.classEdit(1, 1, [2, 3, 4, 5])

console.log(classList.check())