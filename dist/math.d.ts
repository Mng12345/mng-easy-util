/**
 * generate random int between [low, high)
 * @param low
 * @param high
 */
export declare function randomInt(low: number, high: number): number;
/**
 * random n not repeat int between [low, high)
 * @param low
 * @param high
 * @param n
 */
export declare function randomNIntNotRepeat(low: number, high: number, n: number): number[];
/**
 * select n items of data
 * @param data
 * @param n
 */
export declare function sample<T>(data: T[], n: number): T[];
