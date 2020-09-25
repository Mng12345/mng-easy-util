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
var min_max_1 = require("./min-max");
test('min & max', function () {
    var Item = /** @class */ (function () {
        function Item(a, b) {
            this.a = a;
            this.b = b;
        }
        Item.prototype.compare = function (other) {
            return this.a + this.b - other.a - other.b;
        };
        return Item;
    }());
    var array = [new Item(1, 2), new Item(3, 4), new Item(0, 3), new Item(1, 1)];
    var _a = __read(min_max_1.min(array, function (item) { return item; }), 2), minVal = _a[0], minIndex = _a[1];
    var _b = __read(min_max_1.max(array, function (item) { return item; }), 2), maxVal = _b[0], maxIndex = _b[1];
    expect(minVal.compare(new Item(1, 1))).toBe(0);
    expect(minIndex).toBe(3);
    expect(maxVal.compare(new Item(3, 4))).toBe(0);
    expect(maxIndex).toBe(1);
});
