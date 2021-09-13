"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHexColorToNumber = exports.convertColorToHexCharArray = exports.convertColorToHexNumberArray = exports.toBNumber = exports.isCloseable = exports.r2 = exports.correlation = exports.covariance = exports.std = exports.variance = exports.dotMultiply = exports.range = exports.brokerage = exports.round = exports.normalize = exports.macd = exports.add = exports.multiply = exports.dif = exports.ema = exports.ma = exports.mean = exports.sum = exports.sample = exports.randomNIntNotRepeat = exports.randomInt = void 0;
const lodash_1 = __importDefault(require("lodash"));
/**
 * generate random int between [low, high)
 * @param low
 * @param high
 */
function randomInt(low, high) {
    return Math.floor((high - low) * Math.random()) + low;
}
exports.randomInt = randomInt;
/**
 * random n not repeat int between [low, high)
 * @param low
 * @param high
 * @param n
 */
function randomNIntNotRepeat(low, high, n) {
    const nums = {};
    while (true) {
        const index = randomInt(low, high);
        nums[index] = undefined;
        if (Object.keys(nums).length >= n) {
            break;
        }
    }
    return Object.keys(nums).map((item) => parseInt(item));
}
exports.randomNIntNotRepeat = randomNIntNotRepeat;
/**
 * select n items of data
 * @param data
 * @param n
 */
function sample(data, n) {
    const res = [];
    const len = data.length;
    for (let i = 0; i < n; i++) {
        res[i] = data[randomInt(0, len)];
    }
    return res;
}
exports.sample = sample;
/**
 * sum
 * @param data
 */
function sum(data) {
    let sumVal = 0;
    for (let item of data) {
        sumVal += item;
    }
    return sumVal;
}
exports.sum = sum;
/**
 * calculate mean value of data
 * @param data
 */
function mean(data) {
    return sum(data) / data.length;
}
exports.mean = mean;
/**
 * calculate ma line of data with window n
 * @param data
 * @param n
 */
function ma(data, n) {
    let sumVal = sum(data.slice(0, n));
    const res = [sumVal / n];
    const len = data.length;
    let index = 0;
    for (let i = n; i < len; i++) {
        sumVal += data[i] - data[i - n];
        res[++index] = sumVal / n;
    }
    return res;
}
exports.ma = ma;
/**
 * ema
 * @param data
 * @param n
 */
function ema(data, n) {
    const res = [];
    res[0] = data[0];
    const len = data.length;
    for (let i = 1; i < len; i++) {
        res[i] = (2 / (n + 1)) * data[i] + ((n - 1) / (n + 1)) * res[i - 1];
    }
    return res;
}
exports.ema = ema;
/**
 * dif of two array
 * @param d1
 * @param d2
 */
function dif(d1, d2) {
    if (d1.length !== d2.length) {
        throw new Error(`the length of d1 must equals to d2`);
    }
    const res = [];
    for (let i = 0; i < d1.length; i++) {
        res[i] = d1[i] - d2[i];
    }
    return res;
}
exports.dif = dif;
/**
 * array * v
 * @param data
 * @param v
 */
function multiply(data, v) {
    const res = [];
    if (typeof v === 'number') {
        for (let i = 0; i < data.length; i++) {
            res[i] = data[i] * v;
        }
        return res;
    }
    else if (v && v.length && typeof v[0] === 'number') {
        if (data.length !== v.length) {
            throw new Error(`the length of data must equals to v`);
        }
        for (let i = 0; i < data.length; i++) {
            res[i] = data[i] * v[i];
        }
        return res;
    }
    else {
        throw Error(`typeof v must be number|number[]`);
    }
}
exports.multiply = multiply;
/**
 * data + v
 * @param data
 * @param v
 */
function add(data, v) {
    const res = [];
    if (typeof v === 'number') {
        for (let i = 0; i < data.length; i++) {
            res[i] = data[i] + v;
        }
        return res;
    }
    else if (v && v.length && typeof v[0] === 'number') {
        if (data.length !== v.length) {
            throw new Error(`the length of data must equals to v`);
        }
        for (let i = 0; i < data.length; i++) {
            res[i] = data[i] + v[i];
        }
        return res;
    }
    else {
        throw new Error(`typeof v must be number|number[]`);
    }
}
exports.add = add;
/**
 * macd
 * @param data
 * @param nShort
 * @param nLong
 * @param nDif
 */
function macd(data, nShort, nLong, nDif) {
    const emaShort = ema(data, nShort);
    const emaLong = ema(data, nLong);
    const difSL = dif(emaShort, emaLong);
    const dea = ema(difSL, nDif);
    return multiply(dif(difSL, dea), 2);
}
exports.macd = macd;
/**
 * normalize data to [low, high]
 * @param data
 * @param low
 * @param high
 */
function normalize(data, low, high) {
    const minVal = lodash_1.default.min(data);
    const maxVal = lodash_1.default.max(data);
    const width = maxVal - minVal;
    const widthTransform = high - low;
    const res = [];
    for (let i = 0; i < data.length; i++) {
        res[i] = ((data[i] - minVal) / width) * widthTransform + low;
    }
    return res;
}
exports.normalize = normalize;
/**
 * round float
 * @param data
 * @param n
 */
function round(data, n) {
    const times = Math.pow(10, n);
    return Math.round(data * times) / times;
}
exports.round = round;
/**
 * calculate stock brokerage
 * @param exchangeType
 * @param amount
 * @param price
 */
function brokerage(exchangeType, amount, price) {
    const transactions = price * amount;
    const stamp = exchangeType === 'sell' ? transactions * 0.001 : 0;
    const transfer = transactions * 0.00002;
    const brokerage = transactions * 0.0003 < 5 ? 5 : transactions * 0.0003;
    return stamp + transfer + brokerage;
}
exports.brokerage = brokerage;
/**
 * return the range between [start, end) with step
 * @param start
 * @param end
 * @param step
 */
function range(start, end, step) {
    const res = [];
    for (let i = start; i < end; i += step) {
        res.push(i);
    }
    return res;
}
exports.range = range;
/**
 * multiply by position
 * @param {number[]} a1
 * @param {number[]} a2
 * @return {number}
 */
function dotMultiply(a1, a2) {
    let res = 0;
    if (a1.length !== a2.length) {
        throw new Error(`the length of a1 and d2 must be equal`);
    }
    for (let i = 0; i < a1.length; i++)
        res += a1[i] * a2[i];
    return res;
}
exports.dotMultiply = dotMultiply;
/**
 * calculate variance of data
 * @param {number[]} data
 * @return {number}
 */
function variance(data) {
    const meanVal = mean(data);
    const dif = add(data, -meanVal);
    return dotMultiply(dif, dif) / (data.length - 1);
}
exports.variance = variance;
/**
 * calculate standard deviation of data
 * @param {number[]} data
 * @return {number}
 */
function std(data) {
    return Math.sqrt(variance(data));
}
exports.std = std;
/**
 * corvation of a1 and a2
 * @param {number[]} a1
 * @param {number[]} a2
 * @return {number}
 */
function covariance(a1, a2) {
    if (a1.length !== a2.length)
        throw new Error(`the length of a1 and a2 must be equal`);
    return dotMultiply(add(a1, -mean(a1)), add(a2, -mean(a2))) / (a1.length - 1);
}
exports.covariance = covariance;
/**
 * calculate the correlation of a1 and a2
 * @param {number[]} a1
 * @param {number[]} a2
 * @return {number}
 */
function correlation(a1, a2) {
    const std1 = std(a1);
    const std2 = std(a2);
    if (std1 > 0 && std2 > 0) {
        return covariance(a1, a2) / (std1 * std2);
    }
    else
        return 0;
}
exports.correlation = correlation;
/**
 * calculate r square of label and predictLabel
 * @param {number[]} label
 * @param {number[]} predictLabel
 * @return {number}
 */
function r2(label, predictLabel) {
    const r = dif(predictLabel, label);
    const m = add(label, -mean(label));
    const residualSum = dotMultiply(r, r);
    const labelMeanDifSum = dotMultiply(m, m);
    return 1 - residualSum / labelMeanDifSum;
}
exports.r2 = r2;
/**
 * judge whether a and b is closeable
 * @param {number} a
 * @param {number} b
 * @param {number} tolerance
 * @return {boolean}
 */
const isCloseable = (a, b, tolerance) => {
    if (!tolerance)
        tolerance = 0.01;
    return Math.abs(a - b) < tolerance;
};
exports.isCloseable = isCloseable;
/**
 * convert num to binary number
 * @param {number} num
 * @param {number} bitLen
 * @return {number[]}
 */
const toBNumber = (num, bitLen) => {
    const bNumArray = [];
    let div = Math.abs(num);
    while (true) {
        const left = div % 2;
        div = (div - left) / 2;
        bNumArray.push(left);
        if (div === 0)
            break;
    }
    if (bitLen < bNumArray.length)
        throw new Error(`the length of binary value of ${num} is ${bNumArray.length}, which is bigger than ${bitLen}`);
    const left = bitLen - bNumArray.length;
    for (let i = 0; i < left; i++)
        bNumArray.push(0);
    return bNumArray.reverse();
};
exports.toBNumber = toBNumber;
/**
 * convert color num to hex number array
 * @param {number} num
 * @return {number[]}
 */
const convertColorToHexNumberArray = (num) => {
    const res = [];
    let div = num;
    for (;;) {
        const leftNum = div % 16;
        div = (div - leftNum) / 16;
        res.push(leftNum);
        if (div === 0)
            break;
    }
    while (res.length < 6) {
        res.push(0);
    }
    return res.reverse();
};
exports.convertColorToHexNumberArray = convertColorToHexNumberArray;
/**
 * convert color num to hex char array
 * @param {number} num
 * @return {string[]}
 */
const convertColorToHexCharArray = (num) => {
    const charMap = {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: 'a',
        11: 'b',
        12: 'c',
        13: 'd',
        14: 'e',
        15: 'f'
    };
    const nums = exports.convertColorToHexNumberArray(num);
    const res = [];
    for (let num of nums) {
        res.push(charMap[num]);
    }
    return res;
};
exports.convertColorToHexCharArray = convertColorToHexCharArray;
/**
 * parse hex string into number, return NaN if parse num failed
 * @param {string} num
 * @return {number}
 */
const parseHexColorToNumber = (num) => {
    num = num.toLowerCase().trim();
    const pattern = /^0x([a-f]|\d){6}$/;
    if (!pattern.test(num)) {
        return NaN;
    }
    const charMap = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        'a': 10,
        'b': 11,
        'c': 12,
        'd': 13,
        'e': 14,
        'f': 15
    };
    num = num.slice(2);
    let value = 0;
    for (let i = 0; i < 6; i++) {
        const c = num[5 - i];
        value += charMap[c] * Math.pow(16, i);
    }
    return value;
};
exports.parseHexColorToNumber = parseHexColorToNumber;
