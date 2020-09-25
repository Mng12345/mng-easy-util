/**
 * generate random int between [low, high)
 * @param low
 * @param high
 */
export function randomInt(low: number, high: number) {
    return Math.floor((high - low) * Math.random()) + low;
}

/**
 * random n not repeat int between [low, high)
 * @param low
 * @param high
 * @param n
 */
export function randomNIntNotRepeat(low: number, high: number, n: number): number[] {
    const nums: {[index: number]: undefined} = {};
    while (true) {
        const index = randomInt(low, high);
        nums[index] = undefined;
        if (Object.keys(nums).length >= n) {
            break;
        }
    }
    return Object.keys(nums).map(item => parseInt(item));
}

/**
 * select n items of data
 * @param data
 * @param n
 */
export function sample<T>(data: T[], n: number): T[] {
    const res: T[] = [];
    const len = data.length;
    for (let i=0; i<n; i++) {
        res[i] = data[randomInt(0, len)];
    }
    return res;
}
