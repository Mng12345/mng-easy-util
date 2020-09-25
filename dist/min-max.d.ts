export interface Comparable {
    compare(this: Comparable, other: Comparable): number;
}
export declare function min<T>(array: T[], extract: (t: T) => Comparable): [T | undefined, number];
export declare function max<T>(array: T[], extract: (t: T) => Comparable): [T | undefined, number];
