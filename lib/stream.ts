
function isArrayLike(data: any): data is ArrayLike<any> {
    return data.length;
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

    each(callback: (item: T, index?: number) => void): void {
        let index = 0;
        for (const item of this.iterator) {
            callback(item, index++);
        }
    }

    map<R>(callback: (item: T, index?: number) => R): Stream<R> {
        let index = 0;
        const outThis = this;
        const itor = new class implements IterableIterator<R> {
            [Symbol.iterator](): IterableIterator<R> {
                return this;
            }
            next(): IteratorResult<R, R> {
                const value = outThis.iterator.next();
                let res: R|undefined = undefined
                if (!value.done) {
                    res = callback(value.value, index++);
                }
                return {
                    done: value.done,
                    value: res as R
                }
            }
        }
        return new Stream<R>(itor);
    }

    filter(callback: (item: T, index?: number) => boolean): Stream<T> {
        let index = 0;
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
                        if (callback(value.value, index++)) {
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
