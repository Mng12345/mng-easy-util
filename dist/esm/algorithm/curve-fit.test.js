import { curveFit } from './curve-fit';
import * as math from '../math';
test('linear curve fit', () => {
    const x = [1, 2, 3, 4, 5];
    const fitFunc = (k, b) => {
        return (x) => k * x + b;
    };
    const y = x.map((item) => fitFunc(2, 1)(item));
    const params = curveFit({
        x,
        y,
        minValues: [-1, -1],
        maxValues: [4, 4],
        fitFunc,
        maxIterations: 500,
        tolerance: 0.2,
    });
    const yPredict = x.map((item) => params.func(item));
    console.log(`y: ${JSON.stringify(y)}\npredict: ${JSON.stringify(yPredict)}\nparams: ${JSON.stringify(params)}`);
    expect(math.isCloseable(params.values[0], 2, 0.1) &&
        math.isCloseable(params.values[1], 1, 0.1)).toBe(true);
});
