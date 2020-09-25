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
exports.normalize = exports.macd = exports.add = exports.multiply = exports.dif = exports.ema = exports.ma = exports.mean = exports.sum = exports.sample = exports.randomNIntNotRepeat = exports.randomInt = void 0;
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
    var sumVal = 0.;
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
        res[i] = (2 / n + 1) * data[i] + ((n - 1) / (n + 1)) * res[i - 1];
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
    if (typeof v === "number") {
        for (var i = 0; i < data.length; i++) {
            res[i] = data[i] * v;
        }
        return res;
    }
    else if (v && v.length && typeof v[0] === "number") {
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
    if (typeof v === "number") {
        for (var i = 0; i < data.length; i++) {
            res[i] = data[i] + v;
        }
        return res;
    }
    else if (v && v.length && typeof v[0] === "number") {
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
