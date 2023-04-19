/**
 * Checks if current index is out of range positively(in an array), 
 * if so, return 0 to wrap index back to beginning of array
 * else, return the current index.
 * @param {int} index current index
 * @param {Array} array array to wrap
 * @return {int} index
 */
export const WrapToFront = (index:number, array:Array<any>):number =>{
    if(index > array.length-1) 
    {
        return 0;
    }
    return index;
}

/**
 * Checks if current index is out of range negatively(in an array), 
 * if so, return the last index in array to wrap index back to end of array
 * else, return the current index.
 * @param {int} index current index
 * @param {Array} array array to wrap
 * @return {int} index
 */
export const WrapToBack = (index:number, array:Array<any>):number =>{
    if(index < 0) 
    {
        return array.length-1;
    }
    return index;
}
