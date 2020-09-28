"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("./stream");
var math_1 = require("./math");
test('stream constructor & collect', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var list = stream.collect();
    expect(math_1.sum(list)).toBe(6);
});
test('each', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var sum = 0;
    stream.each(function (item) { return sum += item; });
    expect(sum).toBe(6);
});
test('map', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var sumVal = math_1.sum(stream.map(function (item) { return item + 1; }).collect());
    expect(sumVal).toBe(9);
});
test('filter', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var filtered = stream.filter(function (item) { return item <= 2; }).collect();
    expect(filtered[0]).toBe(1);
    expect(filtered[1]).toBe(2);
});
