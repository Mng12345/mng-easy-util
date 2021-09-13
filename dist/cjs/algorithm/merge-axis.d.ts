export declare type MergeReturn = [string[] | number[], ...(number | undefined)[][]];
export declare type SingleMergeStringInput = [string[], number[]];
export declare type SingleMergeNumberInput = [number[], number[]];
export declare function merge(...lines: SingleMergeStringInput[] | SingleMergeNumberInput[]): MergeReturn;
