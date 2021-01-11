"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBNumber = exports.isCloseable = exports.r2 = exports.correlation = exports.covariance = exports.std = exports.variance = exports.dotMultiply = exports.range = exports.brokerage = exports.round = exports.normalize = exports.macd = exports.add = exports.multiply = exports.dif = exports.ema = exports.ma = exports.mean = exports.sum = exports.sample = exports.randomNIntNotRepeat = exports.randomInt = void 0;
var lodash_1 = __importDefault(require("lodash"));
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
    var nums = {};
    while (true) {
        var index = randomInt(low, high);
        nums[index] = undefined;
        if (Object.keys(nums).length >= n) {
            break;
        }
    }
    return Object.keys(nums).map(function (item) { return parseInt(item); });
}
exports.randomNIntNotRepeat = randomNIntNotRepeat;
/**
 * select n items of data
 * @param data
 * @param n
 */
function sample(data, n) {
    var res = [];
    var len = data.length;
    for (var i = 0; i < n; i++) {
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
    var e_1, _a;
    var sumVal = 0;
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var item = data_1_1.value;
            sumVal += item;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        }
        finally { if (e_1) throw e_1.error; }
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
    var sumVal = sum(data.slice(0, n));
    var res = [sumVal / n];
    var len = data.length;
    var index = 0;
    for (var i = n; i < len; i++) {
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
    var res = [];
    res[0] = data[0];
    var len = data.length;
    for (var i = 1; i < len; i++) {
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
        throw new Error("the length of d1 must equals to d2");
    }
    var res = [];
    for (var i = 0; i < d1.length; i++) {
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
    var res = [];
    if (typeof v === 'number') {
        for (var i = 0; i < data.length; i++) {
            res[i] = data[i] * v;
        }
        return res;
    }
    else if (v && v.length && typeof v[0] === 'number') {
        if (data.length !== v.length) {
            throw new Error("the length of data must equals to v");
        }
        for (var i = 0; i < data.length; i++) {
            res[i] = data[i] * v[i];
        }
        return res;
    }
    else {
        throw Error("typeof v must be number|number[]");
    }
}
exports.multiply = multiply;
/**
 * data + v
 * @param data
 * @param v
 */
function add(data, v) {
    var res = [];
    if (typeof v === 'number') {
        for (var i = 0; i < data.length; i++) {
            res[i] = data[i] + v;
        }
        return res;
    }
    else if (v && v.length && typeof v[0] === 'number') {
        if (data.length !== v.length) {
            throw new Error("the length of data must equals to v");
        }
        for (var i = 0; i < data.length; i++) {
            res[i] = data[i] + v[i];
        }
        return res;
    }
    else {
        throw new Error("typeof v must be number|number[]");
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
    var emaShort = ema(data, nShort);
    var emaLong = ema(data, nLong);
    var difSL = dif(emaShort, emaLong);
    var dea = ema(difSL, nDif);
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
    var minVal = lodash_1.default.min(data);
    var maxVal = lodash_1.default.max(data);
    var width = maxVal - minVal;
    var widthTransform = high - low;
    var res = [];
    for (var i = 0; i < data.length; i++) {
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
    var times = Math.pow(10, n);
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
    var transactions = price * amount;
    var stamp = exchangeType === 'sell' ? transactions * 0.001 : 0;
    var transfer = transactions * 0.00002;
    var brokerage = transactions * 0.0003 < 5 ? 5 : transactions * 0.0003;
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
    var res = [];
    for (var i = start; i < end; i += step) {
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
    var res = 0;
    if (a1.length !== a2.length) {
        throw new Error("the length of a1 and d2 must be equal");
    }
    for (var i = 0; i < a1.length; i++)
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
    var meanVal = mean(data);
    var dif = add(data, -meanVal);
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
        throw new Error("the length of a1 and a2 must be equal");
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
    var std1 = std(a1);
    var std2 = std(a2);
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
    var r = dif(predictLabel, label);
    var m = add(label, -mean(label));
    var residualSum = dotMultiply(r, r);
    var labelMeanDifSum = dotMultiply(m, m);
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
var isCloseable = function (a, b, tolerance) {
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
var toBNumber = function (num, bitLen) {
    var bNumArray = [];
    var div = Math.abs(num);
    while (true) {
        var left_1 = div % 2;
        div = (div - left_1) / 2;
        bNumArray.push(left_1);
        if (div === 0)
            break;
    }
    if (bitLen < bNumArray.length)
        throw new Error("the length of binary value of " + num + " is " + bNumArray.length + ", which is bigger than " + bitLen);
    var left = bitLen - bNumArray.length;
    for (var i = 0; i < left; i++)
        bNumArray.push(0);
    return bNumArray.reverse();
};
exports.toBNumber = toBNumber;
