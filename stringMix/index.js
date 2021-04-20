/* kata -> 4
    Link: https://www.codewars.com/kata/5629db57620258aa9d000014/train/javascript

    Given two strings s1 and s2, we want to visualize how different the two strings are. We will only take into account the lowercase letters (a to z). First let us count the frequency of each lowercase letters in s1 and s2.

    s1 = "A aaaa bb c"

    s2 = "& aaa bbb c d"

    s1 has 4 'a', 2 'b', 1 'c'

    s2 has 3 'a', 3 'b', 1 'c', 1 'd'

    So the maximum for 'a' in s1 and s2 is 4 from s1; the maximum for 'b' is 3 from s2. In the following we will not consider letters when the maximum of their occurrences is less than or equal to 1.

    We can resume the differences between s1 and s2 in the following string: "1:aaaa/2:bbb" where 1 in 1:aaaa stands for string s1 and aaaa because the maximum for a is 4. In the same manner 2:bbb stands for string s2 and bbb because the maximum for b is 3.

    The task is to produce a string in which each lowercase letters of s1 or s2 appears as many times as its maximum if this maximum is strictly greater than 1; these letters will be prefixed by the number of the string where they appear with their maximum value and :. If the maximum is in s1 as well as in s2 the prefix is =:.

    In the result, substrings (a substring is for example 2:nnnnn or 1:hhh; it contains the prefix) will be in decreasing order of their length and when they have the same length sorted in ascending lexicographic order (letters and digits - more precisely sorted by codepoint); the different groups will be separated by '/'. See examples and "Example Tests".

    Examples:
        s1 = "my&friend&Paul has heavy hats! &"
        s2 = "my friend John has many many friends &"
        mix(s1, s2) --> "2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

        s1 = "mmmmm m nnnnn y&friend&Paul has heavy hats! &"
        s2 = "my frie n d Joh n has ma n y ma n y frie n ds n&"
        mix(s1, s2) --> "1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

        s1="Are the kids at home? aaaaa fffff"
        s2="Yes they are here! aaaaa fffff"
        mix(s1, s2) --> "=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh"

*/

// this is my first solution, I plan to iterate over this a few times and clean it up, but it is a working solution

function mix(s1, s2) {
    // steps:
        /*
            1. clean the strings
                a. no capitols or non-lowercase letters (regex)

            2. make objects with keys as the letters, values as the count
                a. loop with object logic

            3. compare lengths of the letters and establish equality or dominance between objects

            4. create the string and don't allow letters less than or equal to 1 in count
                a. will need to compare the lengths of the values in matching keys and place the correct prefix
                b. add in a line to make the ordering correct
        */

    // clean the strings
        s1 = s1.match(/[a-z]+/gm).join('')  
        s2 = s2.match(/[a-z]+/gm).join('')

    // create objects to store the mapped values
        let stringOneObject = {}
        let stringTwoObject = {}

    // loop through and place the letters in the objects
        for (let i = 0; i < s1.length; i++) {
            stringOneObject.hasOwnProperty(s1[i]) ? stringOneObject[s1[i]] += 1 : stringOneObject[s1[i]] = 1;
        } 

        for (let j = 0; j < s2.length; j++) {
            stringTwoObject.hasOwnProperty(s2[j]) ? stringTwoObject[s2[j]] += 1 : stringTwoObject[s2[j]] = 1;
        } 
    
    // compare the two
        for (let key in stringOneObject) {
            if (stringTwoObject.hasOwnProperty(key)) {
                if (stringOneObject[key] > stringTwoObject[key]) {
                    stringOneObject[`1${key}`] = stringOneObject[key]
                } else if (stringOneObject[key] < stringTwoObject[key]) {
                    stringTwoObject[`2${key}`] = stringTwoObject[key]
                } else {
                    stringOneObject[`=${key}`] = stringOneObject[key]
                }
            } else {
                stringOneObject[`1${key}`] = stringOneObject[key]
            }
            delete stringTwoObject[key]
            delete stringOneObject[key]
        }
        
        for (let key in stringTwoObject) {
            if (!key.includes(2)) {
                stringTwoObject[`2${key}`] = stringTwoObject[key]
                delete stringTwoObject[key]
            }
        }

    // combine, sort, filter the objects into an array
        let stringOneArray = Object.entries(stringOneObject).concat(Object.entries(stringTwoObject)).filter(ele => ele[1] > 1).sort((a, b) => a[0][1] > b[0][1] ? -1 : 1).sort((a, b) => {
            if (a[1] === b[1]) {
                if (a[0].includes('=')) {
                    return 1
                } else {
                    if (a[0][0] > b[0][0]) {
                        return 1
                    } else {
                        if (a[0][0] === b[0][0]) {
                            if (a[0][1] > b[0][1]) {
                                return 1
                            } else {
                                return -1
                            }
                        } else {
                            return -1
                        }
                    }
                }
            } else {
                if (a[1] > b[1]) {
                    return -1
                } else {
                    return 1
                }
            }
        })
        


        // reduce the returned array into a string with the pattern
        stringOneArray = stringOneArray.reduce((acc, curr) => {
            let tempString = curr[0].split('')
            let finalRepeat = tempString[1].repeat(curr[1])
            return acc += `${tempString[0]}:${finalRepeat}/`
        }, '')

        return stringOneArray.slice(0, -1)
}