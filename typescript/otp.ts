// DEPENDENCIES
import { get_character_id, get_character, get_data_size} from './data';
import {generate_four_key} from './Utilities/KeyGen';
import {WrapToFront} from './Utilities/ArrayIndexWrapping';
import {RemoveWhiteSpace} from './Utilities/StringFormat';

// PRIVATE METHODS

/**
 * Builds the cipher/decipher string as well as four key iteration and wrapping.
 * @param {string}text Current cipher/decipher text.
 * @param {number}id Current character id.
 * @param {Array<any>}arr FourKey Array.
 * @param {number}key Current FourKey Key.
 * @returns {[string, number, string]} Tuple of the cipher/decipher string and current key iteration of four key 
 */
const process_iteration = (text:string, id:number, arr:Array<any>, key:number):[string, number, string] => {
    // Attempt to get character from dat object
    let [character, err] = get_character(id);
    // Handle error by sending information to the console 
    // (this would only happen due to programmer error and index going out of bounds)
    if (err) console.log(err);

    // Build Cipher String to display by concatenation
    text += character;
    // Iterate fourKey Array
    key++;
    // Keep index in key array and prevents out of bounds
    key = WrapToFront(key, arr);
    // Return new text, current key in fourKey array and possible err
    return[text, key, err];
}

// PUBLIC METHODS

/**
 * Ciphers text 
 * @param {string}inputString User input string to use in cipher algorithm
 * @returns a string holding the cipher and key to decipher it or error.
 */
export const Cipher = (inputString: string):Object => {
    
    // Local Variables
    let cipheredText: string = "";
    let currentKey: number = 0;
    
    // Generate 4 digit key and store in an array<int> and as string(to give to user)
    const [fourKeyString, fourKeyArray] = generate_four_key();

    // Clear white space in front and back ONLY(not in middle) of text
    inputString = RemoveWhiteSpace(inputString);

    // Cipher Loop - loop through input string
    for(let char of inputString){

        // TEMP FIX: ignore white spaces for ciphering.deciphering and just concat to string and skip iteration
        if(char === " ")
        {
            cipheredText += char;
            continue;
        }

        // Get the ID of the current character from the data object
        let [currentId, err] = get_character_id(char);
        // If error, return early with err message
        if(err) return{error: err}

        // Get the ID of the ciphered character (using the id+key to offset in the data object)
        // Modulo wraps number to front of data object if out of bounds
        let newId:number = (currentId + fourKeyArray[currentKey]) % get_data_size(); 

        [cipheredText, currentKey, err] = process_iteration(cipheredText, newId, fourKeyArray, currentKey);
        // return generic error message to user if failed
        if (err) return{error: 'Something went wrong, please \'Reset\' and try again.'}
    }

    // Capping end of cipher string if currentKey is not at 0 by concatenation of space character 
    // helps when deciphering to ensure we always start at index 0
    if(currentKey !== 0){
        for(currentKey; currentKey < fourKeyArray.length-1; currentKey++)
        {
            cipheredText += " ";
        }
    }

    // Return object with ciphered text and 4key
    return {
        text: cipheredText,
        key: fourKeyString
    }
}

/**
 * Deciphers text. 
 * @param inputString User text input string to use in decipher algorithm.
 * @param inputKey User key input string to use in decipher algorithm.
 * @returns a string holding the decipher or error.
 */
export const Decipher = (inputString:string, inputKey:string):Object => {
    
    // Field
    let currentKey:number = 0;
    let decipheredText:string = "";

    // Clear white space in front and back ONLY
    inputString = RemoveWhiteSpace(inputString);
    inputKey = RemoveWhiteSpace(inputKey);

    // Separate keys into array
    let fourKeyArray = inputKey.split(' ');
    // Throw error to user if not a 4 digit key (input is invalid)
    if (fourKeyArray.length < 4) return {error: 'Error: Keys should be 4 digits long. Include spaces between digits. Try again.'}
    
    // Decipher Loop
    for(let char of inputString){
        // TEMP FIX: ignore white spaces for ciphering.deciphering and just concat to string and skip iteration
        if(char === " ")
        {
            decipheredText += char;
            continue;
        }

        // Get the ID of the current character from the data object
        let [id, err] = get_character_id(char);
        // If error, return early with err message
        if(err) return{error: err}

        // Get the value of the deciphered character ID (id - key) 
        let unCipheredID = (id - parseInt(fourKeyArray[currentKey]));
        
        // Wraps list if ID is less than 0
        if(unCipheredID < 0) unCipheredID = get_data_size() - (unCipheredID*-1);

        [decipheredText, currentKey, err] = process_iteration(decipheredText, unCipheredID, fourKeyArray, currentKey);
        // return generic error message to user if failed
        if (err) return{error: 'Something went wrong, please \'Reset\' and try again.'}
    }

    // Return object with deciphered text
    return {
        text: decipheredText
    }
}
