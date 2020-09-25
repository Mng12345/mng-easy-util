// extend lodash minBy for finding min or max value of Comparable

/**
 * return the min or max value and index of array
 * @param array
 * @param extract
 * @param comparator
 */
function baseExtremum<T>(array: T[], extract: (item: T) => Comparable,
                         comparator: (c1: Comparable, c2: Comparable) => number): [T|undefined, number] {
    let index = -1;
    const length = array.length;
    let bestIndex = index;
    let result: T|undefined = undefined;
    let key: Comparable|undefined = undefined;
    while (++index < length) {
        const value = array[index]
        let current = extract(value);
        if (current != null && (key === undefined
                ? (current === current)
                : comparator(current, key) < 0)
        ) {
            key = current;
            result = value;
            bestIndex = index;
        }
    }
    return [result, bestIndex];
}


export interface Comparable {
    compare(this: Comparable, other: Comparable): number
}

export function min<T>(array: T[], extract: (t: T) => Comparable): [T|undefined, number] {
    return baseExtremum(array, extract, (c1, c2) => c1.compare(c2));
}

export function max<T>(array: T[], extract: (t: T) => Comparable): [T|undefined, number] {
    return baseExtremum(array, extract, (c1, c2) => c2.compare(c1));
}
