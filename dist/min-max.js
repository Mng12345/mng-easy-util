"use strict";
// extend lodash minBy for finding min or max value of Comparable
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparableNumber = exports.max = exports.min = void 0;
var math_1 = require("./math");
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
        if (current != null &&
            (key === undefined ? current === current : comparator(current, key) < 0)) {
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
var ComparableNumber = /** @class */ (function () {
    function ComparableNumber(value, tolerance) {
        this.value = value;
        this.tolerance = tolerance;
    }
    ComparableNumber.prototype.compare = function (other) {
        if (this.value === other.value) {
            return 0;
        }
        else if (math_1.isCloseable(this.value, other.value, this.tolerance)) {
            return 0;
        }
        else
            return this.value < other.value ? -1 : 1;
    };
    ComparableNumber.prototype.clone = function () {
        return new ComparableNumber(this.value, this.tolerance);
    };
    return ComparableNumber;
}());
exports.ComparableNumber = ComparableNumber;
