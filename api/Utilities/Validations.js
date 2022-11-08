const Data = require("../data.js")

// Private Functions
/**
 * Validate if the character is lowercase, if not make it lowercase and return it
 * @param {string} char users input string[char].
 * @return {string} lowercase character. 
 */
 const ValidateLowercase = (char) => {
    let isCapital = char.match(/[A-Z]/g);
    if(isCapital !== null && isCapital.length > 0)
        return char.toLowerCase();
    return char;
}
/**
 * Validates if the input(char) is in the list of available characters and returns true/false.
 * @param {char} char The input character.
 * @return {bool} true if char exist, false if not.
 */
const isValidChar = (char) => {
    return Data.characters[char] !== undefined ? true : false;
}

// Public Function
/**
 * Validates lowercase and valid character.
 */
const ValidateInput = (char) =>{
    let _char = ValidateLowercase(char);
    let error
    if(!isValidChar(_char)){
        error = "Invalid Character: Sorry, the character: " + _char + " is not currently supported by OTD app."
    }
    return [ _char, error ]
}

module.exports = ValidateInput;