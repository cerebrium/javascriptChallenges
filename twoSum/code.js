/*
    1. make a hashtable for the numbers in the array
    2. see if the numbers required are present
    3. return the index of the requisite numbers
*/
// for a cleaner 'pass' in the turnery 
var pass = null;
// function that returns the hashtable for the array
function returnHash(inputArray) {
    // instantiate the map to return
    var localHashMap = {};
    // loop through the numbers and map the values
    inputArray.forEach(function (ele, eleId) {
        localHashMap.hasOwnProperty(ele) ? pass : localHashMap[ele] = {
            present: true,
            index: eleId
        };
    });
    // return the object
    return localHashMap;
}
// make a function that loops through the object and detemines best matches
function twoSum(inputArray, inputNumper) {
    // array to populate
    var returnArray = [];
    // make the hashtable
    var localHash = returnHash(inputArray);
    // loop through the array and find the matching numbers
    for (var i = 0; i < inputArray.length; i++) {
        // check if the pair exists
        if (localHash.hasOwnProperty(inputNumper - inputArray[i])) {
            // return the array if found
            return [i, localHash[inputNumper - inputArray[i]].index];
        }
    }
    // return the final array
    return returnArray;
}
var testArray = [2, 7, 11, 15];
console.log(twoSum(testArray, 18));
