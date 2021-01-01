"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("./stream");
var math_1 = require("./math");
var json_1 = require("./json");
test('stream constructor & collect', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var list = stream.collect();
    expect(math_1.sum(list)).toBe(6);
});
test('each & index', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var sum = 0;
    stream.each(function (item) { return (sum += item); });
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
    var indexSum = math_1.sum(stream.map(function (item, index) { return index; }).collect());
    expect(indexSum).toBe(3);
});
test('filter & index', function () {
    var stream = stream_1.Stream.of([1, 2, 3]);
    var filtered = stream.filter(function (item) { return item <= 2; }).collect();
    expect(filtered[0]).toBe(1);
    expect(filtered[1]).toBe(2);
    stream = stream_1.Stream.of([1, 2, 3]);
    var filteredSumByIndex = math_1.sum(stream.filter(function (item, index) { return index <= 1; }).collect());
    expect(filteredSumByIndex).toBe(3);
});
test('filter & map & collect', function () {
    var stream = stream_1.Stream.of(math_1.range(0, 10, 1));
    var items = stream
        .filter(function (item) { return item > 3; })
        .map(function (item) { return item * 2; })
        .collect();
    console.log("original: ", math_1.range(0, 10, 1));
    console.log("items: ", items);
    expect(items[0]).toBe(8);
});
test('filter', function () {
    var stream = stream_1.Stream.of([0, 1, 2, 3, 4, 5, 6]);
    var items = stream.filter(function (item) { return item > 3; }).collect();
    console.log("items: ", items);
    expect(items[0]).toBe(4);
});
test('stream & range', function () {
    var list = stream_1.Stream.of(math_1.range(0, 20, 1))
        .map(function (i) { return i; })
        .collect();
    console.log("list: ", json_1.stringifyNoCircle(list));
});
