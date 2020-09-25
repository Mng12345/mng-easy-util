"use strict";
// extend lodash minBy for finding min or max value of Comparable
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = exports.min = void 0;
/**
 * return the min or max value and index of array
 * @param array
 * @param extract
 * @param comparator
 */
function baseExtremum(array, extract, comparator) {
    var index = -1;
    var length = array.length;
    var bestIndex = index;
    var result = undefined;
    var key = undefined;
    while (++index < length) {
        var value = array[index];
        var current = extract(value);
        if (current != null && (key === undefined
            ? (current === current)
            : comparator(current, key) < 0)) {
            key = current;
            result = value;
            bestIndex = index;
        }
    }
    return [result, bestIndex];
}
function min(array, extract) {
    return baseExtremum(array, extract, function (c1, c2) { return c1.compare(c2); });
}
exports.min = min;
function max(array, extract) {
    return baseExtremum(array, extract, function (c1, c2) { return c2.compare(c1); });
}
exports.max = max;
