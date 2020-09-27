
function isArrayLike(data: any): data is ArrayLike<any> {
    return data.length && data[0];
}

export class Stream<T> {

    iterator: IterableIterator<T>

    constructor(data: ArrayLike<T>|IterableIterator<T>) {
        if (isArrayLike(data)) {
            let index = 0;
            this.iterator = new class implements IterableIterator<T> {
                next(): IteratorResult<T, any> {
                    const value = data[index];
                    if (index < data.length) {
                        index++;
                        return {
                            done: false,
                            value
                        }
                    } else {
                        return {
                            done: true,
                            value
                        }
                    }
                }
                [Symbol.iterator](): IterableIterator<T> {
                    return this;
                }
            }
        } else {
            this.iterator = data;
        }
    }

    static of <T>(data: ArrayLike<T> | IterableIterator<T>): Stream<T> {
        if (isArrayLike(data)) {

        }
        return undefined as any;
    }

}

export function each<T>(itor: IterableIterator<T>, callback: (item: T) => void) {
    for (let item of itor) {
        callback(item);
    }
}

export function f() {

}
