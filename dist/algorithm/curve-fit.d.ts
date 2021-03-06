export declare type Options = {
    x: number[];
    y: number[];
    minValues: number[];
    maxValues: number[];
    maxIterations?: number;
    tolerance?: number;
    fitFunc: (...params: number[]) => (x: number) => number;
};
export declare type Parameter = {
    values: number[];
    error: number;
    iterations: number;
    func: (x: number) => number;
};
export declare const curveFit: ({ x, y, minValues, maxValues, maxIterations, tolerance, fitFunc, }: Options) => Parameter;
