"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./math");
test('ema', function () {
    var data = [5.1, 5.2, 5.0, 4.9, 5.3, 5.5, 4.8];
    var emaData = math_1.ema(data, 4);
    expect(Math.abs(data[data.length - 1] - emaData[emaData.length - 1]) < 2).toBe(true);
});
test('variance & std', function () {
    var a1 = [1, 1, 1];
    var a2 = [1, 0, 1];
    expect(math_1.variance(a1)).toBe(0);
    expect(Math.abs(math_1.variance(a2) - 1 / 3) <= 0.01).toBe(true);
    expect(math_1.std(a1)).toBe(0);
    expect(Math.abs(math_1.std(a2) - Math.sqrt(1 / 3)) <= 0.01).toBe(true);
});
test('r2', function () {
    var a1 = [1, 0, 1];
    var a2 = [1, 0, 1];
    var a3 = [1, 1, 0];
    expect(math_1.r2(a1, a2)).toBe(1);
    var r2a13 = math_1.r2(a1, a3);
    expect(r2a13 <= 1).toBe(true);
});
