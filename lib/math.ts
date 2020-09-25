import lodash from "lodash";

/**
 * generate random int between [low, high)
 * @param low
 * @param high
 */
export function randomInt(low: number, high: number) {
    return Math.floor((high - low) * Math.random()) + low;
}

/**
 * random n not repeat int between [low, high)
 * @param low
 * @param high
 * @param n
 */
export function randomNIntNotRepeat(low: number, high: number, n: number): number[] {
    const nums: {[index: number]: undefined} = {};
    while (true) {
        const index = randomInt(low, high);
        nums[index] = undefined;
        if (Object.keys(nums).length >= n) {
            break;
        }
    }
    return Object.keys(nums).map(item => parseInt(item));
}

/**
 * select n items of data
 * @param data
 * @param n
 */
export function sample<T>(data: T[], n: number): T[] {
    const res: T[] = [];
    const len = data.length;
    for (let i=0; i<n; i++) {
        res[i] = data[randomInt(0, len)];
    }
    return res;
}

/**
 * sum
 * @param data
 */
export function sum(data: number[]): number {
    let sumVal = 0.;
    for (let item of data) {
        sumVal += item;
    }
    return sumVal;
}

/**
 * calculate mean value of data
 * @param data
 */
export function mean(data: number[]) {
    return sum(data) / data.length;
}

/**
 * calculate ma line of data with window n
 * @param data
 * @param n
 */
export function ma(data: number[], n: number) {
    let sumVal = sum(data.slice(0, n));
    const res: number[] = [sumVal / n];
    const len = data.length;
    let index = 0;
    for (let i=n; i<len; i++) {
        sumVal += data[i] - data[i-n];
        res[++index] = sumVal / n;
    }
    return res;
}

/**
 * ema
 * @param data
 * @param n
 */
export function ema(data: number[], n: number) {
    const res: number[] = [];
    res[0] = data[0];
    const len = data.length;
    for (let i=1; i<len; i++) {
        res[i] = (2 / n + 1) * data[i] + ((n - 1) / (n + 1)) * res[i-1];
    }
    return res;
}

/**
 * dif of two array
 * @param d1
 * @param d2
 */
export function dif(d1: number[], d2: number[]): number[] {
    if (d1.length !== d2.length) {
        throw new Error(`the length of d1 must equals to d2`);
    }
    const res: number[] = [];
    for (let i=0; i<d1.length; i++) {
        res[i] = d1[i] - d2[i];
    }
    return res;
}

/**
 * array * v
 * @param data
 * @param v
 */
export function multiply(data: number[], v: number|number[]): number[] {
    const res: number[] = [];
    if (typeof v === "number") {
        for (let i=0; i<data.length; i++) {
            res[i] = data[i] * v;
        }
        return res;
    } else if (v && v.length && typeof v[0] === "number") {
        if (data.length !== v.length) {
            throw new Error(`the length of data must equals to v`)
        }
        for (let i=0; i<data.length; i++) {
            res[i] = data[i] * v[i];
        }
        return res;
    } else {
        throw Error(`typeof v must be number|number[]`);
    }
}

/**
 * data + v
 * @param data
 * @param v
 */
export function add(data: number[], v: number|number[]): number[] {
    const res: number[] = [];
    if (typeof v === "number") {
        for (let i=0; i<data.length; i++) {
            res[i] = data[i] + v;
        }
        return res;
    } else if (v && v.length && typeof v[0] === "number") {
        if (data.length !== v.length) {
            throw new Error(`the length of data must equals to v`);
        }
        for (let i=0; i<data.length; i++) {
            res[i] = data[i] + v[i];
        }
        return res;
    } else {
        throw new Error(`typeof v must be number|number[]`);
    }
}

/**
 * macd
 * @param data
 * @param nShort
 * @param nLong
 * @param nDif
 */
export function macd(data: number[], nShort: number, nLong: number, nDif: number): number[] {
    const emaShort = ema(data, nShort);
    const emaLong = ema(data, nLong);
    const difSL = dif(emaShort, emaLong);
    const dea = ema(difSL, nDif);
    return multiply(dif(difSL, dea), 2);
}

/**
 * normalize data to [low, high]
 * @param data
 * @param low
 * @param high
 */
export function normalize(data: number[], low: number, high: number): number[] {
    const minVal = lodash.min(data)!;
    const maxVal = lodash.max(data)!;
    const width = maxVal - minVal;
    const widthTransform = high - low;
    const res: number[] = [];
    for (let i=0; i<data.length; i++) {
        res[i] = ((data[i] - minVal) / width) * widthTransform + low;
    }
    return res;
}

/**
 * round float
 * @param data
 * @param n
 */
export function round(data: number, n: number): number {
    const times = Math.pow(10, n);
    return Math.round(data * times) / times;
}

/**
 * calculate stock brokerage
 * @param exchangeType
 * @param amount
 * @param price
 */
export function brokerage(exchangeType: "buy"|"sell", amount: number, price: number): number {
    const transactions = price * amount;
    const stamp = exchangeType === "sell" ? transactions * 0.001 : 0;
    const transfer = transactions * 0.00002;
    const brokerage = transactions * 0.0003 < 5 ? 5 : transactions * 0.0003;
    return stamp + transfer + brokerage;
}
