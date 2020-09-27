
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

    static of <T>(data: ArrayLike<T>|IterableIterator<T>): Stream<T> {
        return new Stream<T>(data);
    }

    each(callback: (item: T) => void): void {
        for (const item of this.iterator) {
            callback(item);
        }
    }

    map<R>(callback: (item: T) => R): Stream<R> {
        const outThis = this;
        const itor = new class implements IterableIterator<R> {
            [Symbol.iterator](): IterableIterator<R> {
                return this;
            }
            next(): IteratorResult<R, R> {
                const value = outThis.iterator.next();
                let res: R|undefined = undefined
                if (!value.done) {
                    res = callback(value.value);
                }
                return {
                    done: value.done,
                    value: res as R
                }
            }
        }
        return new Stream<R>(itor);
    }

    filter(callback: (item: T) => boolean): Stream<T> {
        const outThis = this;
        const itor = new class implements IterableIterator<T> {
            [Symbol.iterator](): IterableIterator<T> {
                return this;
            }
            next(): IteratorResult<T, T> {
                let valueFiltered: IteratorResult<T, T>
                while (true) {
                    const value = outThis.iterator.next();
                    valueFiltered = value;
                    if (value.done) {
                        // iterator done
                        valueFiltered = value;
                        break;
                    } else {
                        // check filter
                        if (callback(value.value)) {
                            valueFiltered = value;
                            break;
                        }
                    }
                }
                return valueFiltered;
            }
        }
        return new Stream<T>(itor);
    }

    collect(): T[] {
        const res: T[] = [];
        for (let item of this.iterator) {
            res.push(item);
        }
        return res;
    }
}
