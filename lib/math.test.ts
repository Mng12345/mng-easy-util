import {ema, mean} from "./math";

test('ema', () => {
    const data = [5.1, 5.2, 5.0, 4.9, 5.3, 5.5, 4.8];
    const emaData = ema(data, 4);
    expect(Math.abs(data[data.length-1] - emaData[emaData.length-1]) < 2).toBe(true);
})
