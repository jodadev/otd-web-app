// Private
/**
 * Dictionary of available characters that may be ciphered.
 */
const characters: Object = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7,
    'i': 8,
    'j': 9,
    'k': 10,
    'l': 11,
    'm': 12,
    'n': 13,
    'o': 14,
    'p': 15,
    'q': 16,
    'r': 17,
    's': 18,
    't': 19,
    'u': 20,
    'v': 21,
    'w': 22,
    'x': 23,
    'y': 24,
    'z': 25,
    '~': 26,
    '!': 27,
    '@': 28,
    '#': 29,
    '$': 30,
    '%': 31,
    '^': 32,
    '*': 33,
    '(': 34,
    ')': 35,
    '-': 36,
    '_': 37,
    '=': 38,
    '[': 39,
    ']': 40,
    '{': 41,
    '}': 42,
    '|': 43,
    ';': 44,
    ':': 45,
    ',': 46,
    '.': 47,
    '/': 48,
    '?': 49,
    '0': 50,
    '1': 51,
    '2': 52,
    '3': 53,
    '4': 54,
    '5': 55,
    '6': 56,
    '7': 57,
    '8': 58,
    '9': 59,
    // ' ': 60, removed because it causes issues when cipher is created with space in front or back of string then removed during decipher: RemoveWhitespace function
}

/**
 * Validate if the character is lowercase, if not make it lowercase and return it
 * @param {string} char users input string[char].
 * @return {string} lowercase character. 
 */
const validate_lowercase = (char:string):string => {
    let isCapital:RegExpMatchArray = char.match(/[A-Z]/g);
    if(isCapital !== null && isCapital.length > 0)
        return char.toLowerCase();
    return char;
}


// PUBLIC METHODS
/**
 * Returns the size of the data object (size of elements in data object NOT bytes).
 */
export const get_data_size = ():number => {
    return Object.keys(characters).length;
}


/**
 * Based on number that is passed as argument, this function uses that number to find the character
 * associated with it and returns the character as a string by to the caller.
 * @param charId Id(number) value of character 
 * @returns Tuple [string, string] Character or Error 
 */
export const get_character = (charId: number):[string, string] =>{
    // Attempt to get character from data object using character
    let character:string = Object.keys(characters).find((key: string) => characters[key] === charId);
    // Validate the id exists in data object
    let err = character !== undefined ? undefined : `Invalid request: the number ${charId} does not appear in the data object - could not fetch appropriate character.`;
    // Return tuple holding possible err/value
    return [character, err];
}

/**
 * Based on the character passed as argument, this function uses it as a key to access the data object
 * and return its value - in this case the character ID. (Key = Character, Value = CharacterID).
 * First performs validations (lowercased and is in data object), if error return message.
 * @param character Single Character
 * @returns Tuple [number, string] Character Id or Error 
 */
export const get_character_id = (charKey: string):[number, string] =>{
    // Validate the character is lowercased
    charKey = validate_lowercase(charKey);
    // Attempt to get id from data object using character key
    let id:number = characters[charKey];
    // Validate the character exists in data object
    let err:string = id !== undefined ? undefined : `Invalid input: Sorry, the character: ${charKey} is not currently supported by OTP app.`;
    // Return tuple holding possible err/value
    return [id, err];
}