import {Stream} from "./stream";
import {sum} from "./math";

test('stream constructor & collect', () => {
    const stream = Stream.of([1, 2, 3]);
    const list = stream.collect();
    expect(sum(list)).toBe(6);
})

test('each', () => {
    const stream = Stream.of([1, 2, 3]);
    let sum = 0;
    stream.each(item => sum += item);
    expect(sum).toBe(6);
})

test('map', () => {
    const stream = Stream.of([1, 2, 3]);
    const sumVal = sum(stream.map(item => item + 1).collect());
    expect(sumVal).toBe(9);
})

test('filter', () => {
    const stream = Stream.of([1, 2, 3]);
    const filtered = stream.filter(item => item <= 2).collect();
    expect(filtered[0]).toBe(1);
    expect(filtered[1]).toBe(2);
})
