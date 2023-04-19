import {get_data_size} from '../data'

/**
 * Generate a key at random.
 * @return {int} number of either 1 or 2 digit.
 */
const RandomKey = ():number => {
    let offset:number = 1; // initialized to not allow 0
    return Math.floor(Math.random() * (get_data_size() - 1) + offset);
}

/**
 * Generate a four number key. 
 * @return {Tuple}[key string, key array]
 */
export const generate_four_key = ():[string, Array<number>] => {
    let str:string = ""; 
    let arr:Array<number> = [];

    for(let i:number = 0; i < 4; i++){
        // Test block: 
        // if(i===0){
        //     str += '43 ';
        //     arr.push(43);
        //     continue;
        // }

        arr[i] = RandomKey();
        str += arr[i] + " ";
    }
    return [str, arr]
}
