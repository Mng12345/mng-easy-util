import { Cloneable } from './clone';
export interface Comparable {
    compare(this: Comparable, other: Comparable): number;
}
export declare function min<T>(array: T[], extract: (t: T) => Comparable): [T | undefined, number];
export declare function max<T>(array: T[], extract: (t: T) => Comparable): [T | undefined, number];
export declare class ComparableNumber implements Cloneable, Comparable {
    value: number;
    tolerance: number;
    constructor(value: number, tolerance: number);
    compare(this: ComparableNumber, other: ComparableNumber): number;
    clone(): ComparableNumber;
}
