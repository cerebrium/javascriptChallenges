/*
  promt: given an array, of arrays. Each inner array containing two numbers.
  The first number tells how tall the person is, the second tells how many people they can see in front of them
  If the person is shorter than them in front of them they cant see the person

  Thoughts:

    1. Initial way:
      a. Make a hashmap based on the second number of the array
      b. Apply further rules after
      
    2. This method would involve multiple loops through the data (On) and have space-complexity involved with building the hashmap
      a. This method also appears to be complex in the second iteration for sorting - There is probably a better data structure

  -----------

  1. could use a tree (non-binary) - but the same issues as above will remain
    a. there might be a trick with depth versus height searching algorithms


  -----------
  1. First attempt:
    a. a hasmap, but of heights passed rearranging in place (On) - linear one pass; space-complexity issues the same


  -----------
  None of my strategies are making a ton of sense.... so trying to think outside the box
  1. we have a height and a placment - multiply the two to get an 'area' ? and sort on this
*/
var testArray = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]];
// step 2
// helper will take one parameter current array
function hashMapGen(array) {
    // this function returns a hash of sorted arrays with keys height and values sorted placments
    // instantiate the hash
    var hash = {};
    // going to create the map based on height
    array.forEach(function (ele) {
        // check if the height exists yet
        if (hash.hasOwnProperty(ele[0])) {
            // if it does, place objects in order
            hash[ele[0]].forEach(function (innerEle, innerEleId) {
                // check if the line placment is higher or lower
                if (innerEle[1] > ele[1]) {
                    hash[ele[0]].splice(innerEleId, 0, ele[1]);
                }
                else {
                    hash[ele[0]].push(ele[1]);
                }
            });
            // otherwise, make the array
        }
        else {
            hash[ele[0]] = [ele[1]];
        }
    });
    // return the map so far
    return hash;
}
// step 1
function queRecon(array) {
    // instantiate an object for hashing
    var hash = hashMapGen(array);
    // loop through hash and create the new array based on the rules
    var finalArray = [];
    // make an ordering
    var keyList = Object.keys(hash);
    // keyList in reverse order
    keyList.sort(function (a, b) { return (a > b ? -1 : 1); });
    // loop through the keys and handle there elements
    keyList.forEach(function (key) {
        // loop through the array of the key - already sorted by placment
        hash[key].forEach(function (person) {
            person = [parseInt(key), person];
            if (finalArray.length > 0) {
                // check if person is 0
                if (person[1] === 0) {
                    // add person to front
                    finalArray.unshift(person);
                }
                else {
                    // make an index for if placment condition is met
                    var placementCondition = person[1];
                    var currentIndex = 0;
                    // loop through the array and find the place
                    while (placementCondition > 0 && currentIndex !== array.length) {
                        // if the current person is shorter than the line index, decrease the line plcement count
                        placementCondition--;
                        // increase the index
                        currentIndex++;
                    }
                    // add the person at the found index
                    finalArray.splice(currentIndex, 0, person);
                }
            }
            else {
                // insert the aray from the biggest height
                finalArray.push([parseInt(key), person[1]]);
            }
        });
    });
    // the reordering is to be done in place to return the same array
    return finalArray;
}
// run function
console.log(queRecon(testArray));
// expected output
// [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
