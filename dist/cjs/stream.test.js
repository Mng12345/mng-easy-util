"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("./stream");
const math_1 = require("./math");
const json_1 = require("./json");
test('stream constructor & collect', () => {
    const stream = stream_1.Stream.of([1, 2, 3]);
    const list = stream.collect();
    expect(math_1.sum(list)).toBe(6);
});
test('each & index', () => {
    let stream = stream_1.Stream.of([1, 2, 3]);
    let sum = 0;
    stream.each((item) => (sum += item));
    expect(sum).toBe(6);
    stream = stream_1.Stream.of([1, 2, 3]);
    let indexSum = 0;
    stream.each((item, index) => {
        indexSum += index;
    });
    expect(indexSum).toBe(3);
});
test('map & index', () => {
    let stream = stream_1.Stream.of([1, 2, 3]);
    const sumVal = math_1.sum(stream.map((item) => item + 1).collect());
    expect(sumVal).toBe(9);
    stream = stream_1.Stream.of([1, 2, 3]);
    const indexSum = math_1.sum(stream.map((item, index) => index).collect());
    expect(indexSum).toBe(3);
});
test('filter & index', () => {
    let stream = stream_1.Stream.of([1, 2, 3]);
    const filtered = stream.filter((item) => item <= 2).collect();
    expect(filtered[0]).toBe(1);
    expect(filtered[1]).toBe(2);
    stream = stream_1.Stream.of([1, 2, 3]);
    const filteredSumByIndex = math_1.sum(stream.filter((item, index) => index <= 1).collect());
    expect(filteredSumByIndex).toBe(3);
});
test('filter & map & collect', () => {
    let stream = stream_1.Stream.of(math_1.range(0, 10, 1));
    const items = stream
        .filter((item) => item > 3)
        .map((item) => item * 2)
        .collect();
    console.log(`original: `, math_1.range(0, 10, 1));
    console.log(`items: `, items);
    expect(items[0]).toBe(8);
});
test('filter', () => {
    let stream = stream_1.Stream.of([0, 1, 2, 3, 4, 5, 6]);
    const items = stream.filter((item) => item > 3).collect();
    console.log(`items: `, items);
    expect(items[0]).toBe(4);
});
test('stream & range', () => {
    const list = stream_1.Stream.of(math_1.range(0, 20, 1))
        .map((i) => i)
        .collect();
    console.log(`list: `, json_1.stringifyNoCircle(list));
});
test('stream & flatMap & groupBy', () => {
    const dict = stream_1.Stream.of([1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8]).groupBy(item => item).toDict();
    console.log(`dict:`, JSON.stringify(dict));
    stream_1.Stream.of([1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8]).groupBy(item => item)
        .forEach(item => console.log(item));
    stream_1.Stream.of([1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8]).groupBy(item => item)
        .flatMap(item => item[1])
        .forEach(item => console.log(item));
    const flatValue = stream_1.Stream.of([1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8]).groupBy(item => item)
        .map(item => item[1]).flatMap(item => item).collect();
    console.log(`flatValue:`, JSON.stringify(flatValue));
    const collapsedValue = stream_1.Stream.of([1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8]).groupBy(item => item)
        .map(item => item[1]).collect();
    console.log(`collapsedValue:`, JSON.stringify(collapsedValue));
});
