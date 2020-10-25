"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("./stream");
var math_1 = require("./math");
test('stream constructor & collect', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var list = stream.collect();
    expect(math_1.sum(list)).toBe(6);
});
test('each & index', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var sum = 0;
    stream.each(function (item) { return sum += item; });
    expect(sum).toBe(6);
    stream = stream_1.Stream.of([1, 2, 3]);
    var indexSum = 0;
    stream.each(function (item, index) {
        indexSum += index;
    });
    expect(indexSum).toBe(3);
});
test('map & index', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var sumVal = math_1.sum(stream.map(function (item) { return item + 1; }).collect());
    expect(sumVal).toBe(9);
    stream = stream_1.Stream.of([1, 2, 3]);
    var indexSum = math_1.sum(stream.map(function (item, index) { return index; })
        .collect());
    expect(indexSum).toBe(3);
});
test('filter & index', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var filtered = stream.filter(function (item) { return item <= 2; }).collect();
    expect(filtered[0]).toBe(1);
    expect(filtered[1]).toBe(2);
    stream = stream_1.Stream.of([1, 2, 3]);
    var filteredSumByIndex = math_1.sum(stream.filter(function (item, index) { return index <= 1; })
        .collect());
    expect(filteredSumByIndex).toBe(3);
});
