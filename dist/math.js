"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample = exports.randomNIntNotRepeat = exports.randomInt = void 0;
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
