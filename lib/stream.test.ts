import {Stream} from "./stream";
import {sum} from "./math";

test('stream constructor & collect', () => {
    const stream = Stream.of([1, 2, 3]);
    const list = stream.collect();
    expect(sum(list)).toBe(6);
})

test('each & index', () => {
    let stream = Stream.of([1, 2, 3]);
    let sum = 0;
    stream.each(item => sum += item);
    expect(sum).toBe(6);
    stream = Stream.of([1, 2, 3]);
    let indexSum = 0;
    stream.each((item, index) => {
        indexSum += index!;
    })
    expect(indexSum).toBe(3);
})

test('map & index', () => {
    let stream = Stream.of([1, 2, 3]);
    const sumVal = sum(stream.map(item => item + 1).collect());
    expect(sumVal).toBe(9);
    stream = Stream.of([1, 2, 3]);
    const indexSum = sum(stream.map((item, index) => index!)
        .collect());
    expect(indexSum).toBe(3);
})

test('filter & index', () => {
    let stream = Stream.of([1, 2, 3]);
    const filtered = stream.filter(item => item <= 2).collect();
    expect(filtered[0]).toBe(1);
    expect(filtered[1]).toBe(2);
    stream = Stream.of([1, 2, 3]);
    const filteredSumByIndex = sum(stream.filter((item, index) => index! <= 1)
        .collect());
    expect(filteredSumByIndex).toBe(3);
})
