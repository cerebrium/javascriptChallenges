var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var testArray = [1, 2, 3, 4, 5];
// thoughts about this
// prompt
/*
  given an array of numbers, return every permutations of the numbers that is possible
*/
/*
  could use a double loop of some kind
  could perhaps be better to look into a linked list solution

  1. make a linked list
  change the head each time
  iterate through by shifting everything one to the right

  2. better way save an array of index options

  // there does not occur to me a way to do this without double looping .... will now check the answer on the techSeries!
*/
// function that handles producing the final array
function permutations(array) {
    // make array to return
    var returnArray = [];
    // loop through array and add the permutations
    array.forEach(function (number, numberId) {
        // make an array of all the indices
        var indexOptions = Array.from(Array(array.length).keys()).filter(function (ele) { return ele !== numberId; });
        // double loop
        for (var i = 0; i < array.length; i++) {
            // if the number is not the current iterate of the forEach, increment the indexOptions
            if (i !== numberId) {
                // map the second portion of the array to the first number
                var postArray = indexOptions.map(function (ele) {
                    // return the number
                    return array[ele];
                });
                // change the order of the index array
                indexOptions.push(indexOptions[0]);
                indexOptions.shift();
                // for each of the length of the array push the options array
                returnArray.push(__spreadArrays([number], postArray));
            }
        }
    });
    return returnArray;
}
console.log(permutations(testArray));
