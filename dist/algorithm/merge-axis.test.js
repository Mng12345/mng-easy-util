"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var merge_axis_1 = require("./merge-axis");
test('merge input string', function () {
    var lines1 = [
        [['1', '2', '3'], [4, 5, 6]],
        [['2', '3', '4'], [4.1, 5, 6.2]],
        [['0', '1'], [3, 3.9]]
    ];
    var mergedLines1 = merge_axis_1.merge.apply(void 0, __spread(lines1));
    var newXLine = mergedLines1[0];
    var newYLine1 = mergedLines1[1];
    var newYLine2 = mergedLines1[2];
    var newYLine3 = mergedLines1[3];
    expect(newXLine.length).toBe(5);
    expect(newXLine[0]).toBe('0');
    expect(newXLine[4]).toBe('4');
    expect(newYLine1.length).toBe(5);
    expect(newYLine1[0]).toBe(undefined);
    expect(newYLine1[1]).toBe(4);
    expect(newYLine1[4]).toBe(undefined);
    expect(newYLine2.length).toBe(5);
    expect(newYLine2[0]).toBe(undefined);
    expect(newYLine2[2]).toBe(4.1);
    expect(newYLine3.length).toBe(5);
    expect(newYLine3[0]).toBe(3);
    expect(newYLine3[2]).toBe(undefined);
});
test('merge input number', function () {
    var lines1 = [
        [[1, 2, 3], [4, 5, 6]],
        [[2, 3, 4], [4.1, 5, 6.2]],
        [[0, 1], [3, 3.9]]
    ];
    var mergedLines1 = merge_axis_1.merge.apply(void 0, __spread(lines1));
    var newXLine = mergedLines1[0];
    var newYLine1 = mergedLines1[1];
    var newYLine2 = mergedLines1[2];
    var newYLine3 = mergedLines1[3];
    expect(newXLine.length).toBe(5);
    expect(newXLine[0]).toBe(0);
    expect(newXLine[4]).toBe(4);
    expect(newYLine1.length).toBe(5);
    expect(newYLine1[0]).toBe(undefined);
    expect(newYLine1[1]).toBe(4);
    expect(newYLine1[4]).toBe(undefined);
    expect(newYLine2.length).toBe(5);
    expect(newYLine2[0]).toBe(undefined);
    expect(newYLine2[2]).toBe(4.1);
    expect(newYLine3.length).toBe(5);
    expect(newYLine3[0]).toBe(3);
    expect(newYLine3[2]).toBe(undefined);
});
