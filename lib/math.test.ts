import {add, dotMultiply, ema, mean, r2, std, variance} from "./math";

test('ema', () => {
    const data = [5.1, 5.2, 5.0, 4.9, 5.3, 5.5, 4.8];
    const emaData = ema(data, 4);
    expect(Math.abs(data[data.length-1] - emaData[emaData.length-1]) < 2).toBe(true);
});

test('variance & std', () => {
    const a1 = [1, 1, 1];
    const a2 = [1, 0, 1];
    expect(variance(a1)).toBe(0);
    expect(Math.abs(variance(a2) - 1/3) <= 0.01).toBe(true);
    expect(std(a1)).toBe(0);
    expect(Math.abs(std(a2) - Math.sqrt(1/3)) <= 0.01).toBe(true);
});

test('r2', () => {
    const a1 = [1, 0, 1];
    const a2 = [1, 0, 1];
    const a3 = [1, 1, 0];
    expect(r2(a1, a2)).toBe(1);
    const r2a13 = r2(a1, a3);
    expect(r2a13 >= 0 && r2a13 <= 1).toBe(true);
})

