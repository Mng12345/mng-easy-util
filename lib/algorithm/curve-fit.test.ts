import {curveFit} from "./curve-fit";
import * as math from "../math";

test('linear curve fit', () => {
    const x = [1, 2, 3, 4, 5];
    const fitFunc = (k: number, b: number) => {
        return (x: number) => k * x + b;
    };
    const y = x.map(item => fitFunc(2, 1)(item));
    const params = curveFit({
        x, y,
        minValues: [-1, -1],
        maxValues: [4, 4],
        fitFunc
    });
    const yPredict = x.map(item => params.func(item));
    console.log(`y: ${JSON.stringify(y)}\npredict: ${JSON.stringify(yPredict)}`);
    expect(math.isCloseable(params.values[0], 2, 0.1) && math.isCloseable(params.values[1], 1, 0.1)).toBe(true);
})
