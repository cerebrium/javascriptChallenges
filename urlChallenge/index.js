// from: https://www.codewars.com/kata/514a024011ea4fb54200004b/solutions/javascript

// Description: Write a function that when given a URL as a string, parses out just the domain name and returns it as a string. For example:

/* Examples:
    domainName("http://github.com/carbonfive/raygun") == "github" 
    domainName("http://www.zombie-bites.com") == "zombie-bites"
    domainName("https://www.cnet.com") == "cnet"
*/

function domainName(url){
    // ensure input is correct type
    if (typeof url === typeof 'astring') {
        // split off the first part, then match what we want and return it
        return url.replace((/http:\/\/|www|https:\/\//g), '').match(/[^.]+/g)[0]
    } else {
        return null
    }
}