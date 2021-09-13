// extend lodash minBy for finding min or max value of Comparable
import { isCloseable } from './math';
/**
 * return the min or max value and index of array
 * @param array
 * @param extract
 * @param comparator
 */
function baseExtremum(array, extract, comparator) {
    let index = -1;
    const length = array.length;
    let bestIndex = index;
    let result = undefined;
    let key = undefined;
    while (++index < length) {
        const value = array[index];
        let current = extract(value);
        if (current != null &&
            (key === undefined ? current === current : comparator(current, key) < 0)) {
            key = current;
            result = value;
            bestIndex = index;
        }
    }
    return [result, bestIndex];
}
export function min(array, extract) {
    return baseExtremum(array, extract, (c1, c2) => c1.compare(c2));
}
export function max(array, extract) {
    return baseExtremum(array, extract, (c1, c2) => c2.compare(c1));
}
export class ComparableNumber {
    constructor(value, tolerance) {
        this.value = value;
        this.tolerance = tolerance;
    }
    compare(other) {
        if (this.value === other.value) {
            return 0;
        }
        else if (isCloseable(this.value, other.value, this.tolerance)) {
            return 0;
        }
        else
            return this.value < other.value ? -1 : 1;
    }
    clone() {
        return new ComparableNumber(this.value, this.tolerance);
    }
}
