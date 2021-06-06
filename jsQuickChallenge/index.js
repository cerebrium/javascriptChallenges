//////// Input ////////
// Person A booked slots: [{start: 0, end: 60}, {start: 120, end: 180}, {start: 180, end: 260}]
// Person B booked slots: []
//
//////// Output ////////
// Overlapping free time: [{start: 60, end: 120}, {start: 260, end: 1440}]
//

/*
    Prompt:
       We need to grab both dentists data, and find overlapping availability

    Strategy:
        1. make a hashmap of the available times for each dentist
        2. loop through the available times of one dentist and check them with the other dentist
            - return the matching time slots
*/

// function that takes an array of objects, returns available time 
function findAvailableSingle(array) {
    // make sure the appointments are in order
    array.sort((a, b) => (a.start > b.start ? 1 : -1))

    // make a hashtable with the start [key: start]: end
    let hash = {
        0: 1440
    }

    
    // handle empty array
    if (array.length > 0) {
        // make a pointer to the previous item
        let pointer = {start: 0, end: 1440}

        // loop through and add the available times
        array.forEach( (appointment, appointmentId) => {
            // handle case of back-to-back appointments
            if (hash.hasOwnProperty(appointment.start)) {
                // change the value to be the new end
                delete hash[appointment.start]

                // add a new time slot
                hash[appointment.end] = 1440
            } else {

                // handle start case
                if (appointmentId === 0) {
                    // set the initial to end
                    hash[pointer.start] = appointment.start

                    // make the new end time go until the end of the day
                    hash[appointment.end] = 1440
                } else {
                    // take the previous free block and modify the end time
                    hash[pointer.end] = appointment.start
    
                    // make the new end time go until the end of the day
                    hash[appointment.end] = 1440
                }

            }

            // change the pointer
            pointer = appointment
        })
    }

    // return aray of tuples
    return hash
}


function main(arrayA, arrayB) {

    // produce the free time availability object
    let dentistA = findAvailableSingle(arrayA)
    let dentistB = findAvailableSingle(arrayB)

    // final array of allowed times
    let finalArray = []

    // loop through the array and find the answer
    for (let key in dentistA) {

        // find the key value pair in the other object that allows for this time period
        for (let secondKey in dentistB) {

            // check if the start time allows it
            if (parseInt(key) >= parseInt(secondKey)  && parseInt(key) < dentistB[secondKey]) {
                
                // determine which end time to provide
                if (dentistB[secondKey] <= dentistA[key]) {

                    // add the time slot to the final array
                    finalArray.push(
                        {start: key, end: dentistB[secondKey]}
                    )
                    // if the starting point is inbetween the two times for the second, but the end point is before the end -> provide the first time period
                } else {

                    // case that the begining works but the end does not
                    finalArray.push(
                        {start: key, end: dentistA[key]}
                    )
                }
            }
        }
    }


    // return the final array
    return finalArray
    
}

console.log("expecting: [{start: 260, end: 1440}]", main([{start: 0, end: 60}, {start: 120, end: 180}, {start: 180, end: 260}], [{start: 60, end: 120}]))
console.log("expecting: [{start: 60, end: 1440}]", main([{start: 0, end: 60}], []))
console.log("expecting: [{start: 0, end: 120}, {start: 180, end: 1440}]", main([{start: 120, end: 180}], []))