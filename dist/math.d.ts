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
/**
 * sum
 * @param data
 */
export declare function sum(data: number[]): number;
/**
 * calculate mean value of data
 * @param data
 */
export declare function mean(data: number[]): number;
/**
 * calculate ma line of data with window n
 * @param data
 * @param n
 */
export declare function ma(data: number[], n: number): number[];
/**
 * ema
 * @param data
 * @param n
 */
export declare function ema(data: number[], n: number): number[];
/**
 * dif of two array
 * @param d1
 * @param d2
 */
export declare function dif(d1: number[], d2: number[]): number[];
/**
 * array * v
 * @param data
 * @param v
 */
export declare function multiply(data: number[], v: number | number[]): number[];
/**
 * data + v
 * @param data
 * @param v
 */
export declare function add(data: number[], v: number | number[]): number[];
/**
 * macd
 * @param data
 * @param nShort
 * @param nLong
 * @param nDif
 */
export declare function macd(data: number[], nShort: number, nLong: number, nDif: number): number[];
/**
 * normalize data to [low, high]
 * @param data
 * @param low
 * @param high
 */
export declare function normalize(data: number[], low: number, high: number): number[];
