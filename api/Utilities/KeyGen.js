"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_four_key = void 0;
const data_1 = require("../data");
/**
 * Generate a key at random.
 * @return {int} number of either 1 or 2 digit.
 */
const RandomKey = () => {
    let offset = 1; // initialized to not allow 0
    return Math.floor(Math.random() * ((0, data_1.get_data_size)() - 1) + offset);
};
/**
 * Generate a four number key.
 * @return {Tuple}[key string, key array]
 */
const generate_four_key = () => {
    let str = "";
    let arr = [];
    for (let i = 0; i < 4; i++) {
        // Test block: 
        // if(i===0){
        //     str += '43 ';
        //     arr.push(43);
        //     continue;
        // }
        arr[i] = RandomKey();
        str += arr[i] + " ";
    }
    return [str, arr];
};
exports.generate_four_key = generate_four_key;
