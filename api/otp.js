const Data = require("./data");
// Utilities 
const ValidateInput = require("./Utilities/Validations");
const GenerateFourKey = require("./Utilities/KeyGen");
const ArrayIndexWrapping = require("./Utilities/ArrayIndexWrapping");
const StringFormat = require("./Utilities/StringFormat");

// Methods
const Cipher = (text) => {

    // Field
    let cipheredText = "";
    let currentKey = 0;
    
    // Generate 4 number key at random and store in array and as string
    const [fourKeyString, fourKeyArray] = GenerateFourKey(); // Tuple returned
    
    // Clear white space in front and back ONLY of text
    text = StringFormat.RemoveWhiteSpace(text);

    // Cipher Loop
    for(let char in text){
        // Convert index into character string
        char = text.charAt(char);  
        // Input Validations:
        const [validatedChar, err] = ValidateInput(char);
        if(err) return{error: err}
        
        // Get the ID of the current character
        let unCipheredId = Data.characters[validatedChar];
        // Get the ID of the ciphered character
        let cipheredId = (unCipheredId + fourKeyArray[currentKey]) % Data.GetDataSize();
        // Build Cipher String to display
        cipheredText += Data.GetCipheredCharacter(cipheredId);
        // Push through fourKey Array
        currentKey++;
        // Keep index in array loop
        currentKey = ArrayIndexWrapping.WrapToFront(currentKey, fourKeyArray);
    }

    // Capping end of string if currentKey is not at 0
    if(currentKey !== 0){
        for(currentKey; currentKey < fourKeyArray.length-1; currentKey++)
        {
            cipheredText+=" ";
        }
    }

    return {
        text: cipheredText,
        key: fourKeyString
    }
}
const Decipher = (text, key) => {
    
    // Field
    let currentKey = 0;
    let decipheredText = "";

    // Clear white space in front and back ONLY
    text = StringFormat.RemoveWhiteSpace(text);
    key = StringFormat.RemoveWhiteSpace(key);

    // Separate keys into array
    let fourKeyArray = key.split(' ');
    
    // Decipher Loop
    for(let char in text){
        // Equation to get the value of the deciphered character ID
        let unCipheredID = (Data.characters[text.charAt(char)] - parseInt(fourKeyArray[currentKey]));
        
        // Wraps list if ID is less than 0
        if(unCipheredID < 0) unCipheredID = Data.GetDataSize() - (unCipheredID*-1);

        // Build Text String using ID
        decipheredText += Data.GetCipheredCharacter(unCipheredID);
        
        // if reached past beginning of array set back to last index (always 3 if using 4 keys)
        currentKey++;
        currentKey = ArrayIndexWrapping.WrapToFront(currentKey, fourKeyArray);
    }

    return {
        text: decipheredText
    }
}

module.exports = {
    Cipher,
    Decipher
}