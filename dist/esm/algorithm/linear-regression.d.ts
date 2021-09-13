export declare type FitFunc = (...params: number[]) => (...x: number[]) => number;
export declare type Options = {
    x: number[][];
    y: number[];
    initValues: number[];
    fitFunc?: FitFunc;
    maxIterations?: number;
    tolerance?: number;
};
export declare type FitParameter = {
    values: number[];
    error: number;
    iterations: number;
};
export declare const fit: ({ x, y, initValues, fitFunc, maxIterations, tolerance, }: Options) => FitParameter;
