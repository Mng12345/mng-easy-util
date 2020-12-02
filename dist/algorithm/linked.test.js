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
Object.defineProperty(exports, "__esModule", { value: true });
var linked_1 = require("./linked");
var math_1 = require("../math");
test('constructor & addValue & addNode', function () {
    var node = new linked_1.LinkedNode(1);
    node.addNode(new linked_1.LinkedNode(2)).addValue(3);
    var testNode = node;
    var testFunc = function () {
        var array = testNode.toArray();
        var reversedArray = testNode.toArray(true);
        expect(array.length === 3 && reversedArray.length === 3).toBe(true);
        expect(math_1.sum(array)).toBe(6);
        expect(math_1.sum(reversedArray)).toBe(6);
        expect(array[0]).toBe(1);
        expect(reversedArray[0]).toBe(3);
    };
    testFunc();
    testNode = node.next;
    testFunc();
});
test('constructor & insertValue & insertNode', function () {
    var node = new linked_1.LinkedNode(1);
    node.addValue(2).addValue(3);
    var secondNode = node.next;
    node.insertNode(new linked_1.LinkedNode(1.5));
    secondNode.insertValue(2.5);
    var array = node.toArray();
    var reversedArray = node.toArray(true);
    console.log("array:", array);
    console.log("reversed array:", reversedArray);
    expect(array.length === 5 && reversedArray.length === 5).toBe(true);
    expect(array[1]).toBe(1.5);
    expect(array[3]).toBe(2.5);
    expect(reversedArray[1]).toBe(2.5);
    expect(reversedArray[3]).toBe(1.5);
});
test('remove', function () {
    var node = new linked_1.LinkedNode(1);
    node.addValue(2).addValue(3).addValue(4).addValue(5);
    var medianValue = node.next.next;
    console.log("array before remove:", node.toArray());
    var _a = __read(medianValue.remove(), 2), prev = _a[0], next = _a[1];
    console.log("prev:", prev.toString());
    console.log("next:", next.toString());
    console.log("array:", node.toArray());
});
