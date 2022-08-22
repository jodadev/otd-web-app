const utilities = require('./utilities');

const Cipher = (text) => {
    // Clear white space in front and back ONLY
    text = utilities.RemoveWhiteSpace(text);

    // Field
    cipheredText = '';
    cipheredKey = '';

    // Cipher Loop
    for(let char in text){
        // Convert index into character string
        char = text.charAt(char);
        
        // Validations:
        // 1. Ensure ALL letters are lowercase
        char = utilities.ValidateLowercase(char);
        // 2. Is it a valid character?
        if(!utilities.isChar(char)){
            return{
                error: "Invalid Character: Sorry, the character: " + char + " is not currently supported by OTD app."
            }
        }

        // Get the value of the character
        letterVal = utilities.characters[char];
        // Generate a random key and convert to string
        randomKey = utilities.RandomKey();
        // Math Equation to get the value of the cipher character
        encryptedChar = (letterVal + randomKey) % utilities.GetListSize();
        
        // Debugger
        //console.log("letterVal: " + letterVal + " randomKey: " + randomKey + " encryptedChar: " + encryptedChar);
        
        // Convert key to string to use in string builder
        let keyString = randomKey.toString();
        // Build encrypted text and key strings 
        cipheredKey += keyString += ' ';
        for(let char in utilities.characters){ // char is the key strings
            if(encryptedChar == utilities.characters[char]){
                cipheredText += Object.keys(utilities.characters).find(key => utilities.characters[key] === encryptedChar);
                break;
            }
        }
    }
    return {
        text: cipheredText,
        key: cipheredKey
    }
}

const Decipher = (text, key) => {
    // Clear white space in front and back ONLY
    text = utilities.RemoveWhiteSpace(text);
    key = utilities.RemoveWhiteSpace(key);
    
    // Field
    let index = 0;
    let decipheredText = "";
    // Separate keys into array
    let keys = key.split(' ');

    // Decipher Loop
    for(let char in text){
        // Equation to get the value of the deciphered character
        let textVal = (utilities.characters[text.charAt(char)] - parseInt(keys[index]));
        
        // Wraps list if textVal is less than 0
        if(textVal < 0)
            textVal = utilities.GetListSize() - (textVal*-1);

        // Build Text String 
        decipheredText += Object.keys(utilities.characters).find(key => utilities.characters[key] === textVal);
           
        // Increments to next key in array for equation
        index++;
    }

    return {
        text: decipheredText
    }
}

module.exports = {
    Cipher,
    Decipher
}