const Data = require("../data");

/**
 * Generate a key at random.
 * @return {int} number of either 1 or 2 digit.
 */
 const RandomKey = () => {
    let offset = 1; // don't allow 0
    return Math.floor(Math.random() * (Data.GetDataSize() - 1) + offset);
}

/**
 * Generate a four number key. 
 * @return {Tuple}[key string, key array]
 */
const GenerateFourKey = () => {
    let str = ""; 
    let arr = [];
    for(let i = 0; i < 4; i++){
        arr[i] = RandomKey();
        str += arr[i] + " ";
    }
    return [str, arr]
}

module.exports = GenerateFourKey;