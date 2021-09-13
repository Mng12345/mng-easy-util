"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionaryStream = exports.Stream = void 0;
function isArrayLike(data) {
    return data.length;
}
class Stream {
    constructor(data) {
        if (isArrayLike(data)) {
            let index = 0;
            this.iterator = new (class {
                next() {
                    const value = data[index];
                    if (index < data.length) {
                        index++;
                        return {
                            done: false,
                            value,
                        };
                    }
                    else {
                        return {
                            done: true,
                            value,
                        };
                    }
                }
                [Symbol.iterator]() {
                    return this;
                }
            })();
        }
        else {
            this.iterator = data;
        }
    }
    static of(data) {
        return new Stream(data);
    }
    each(callback) {
        let index = 0;
        for (const item of this.iterator) {
            callback(item, index++);
        }
    }
    forEach(callback) {
        this.each(callback);
    }
    map(callback) {
        let index = 0;
        const outThis = this;
        const itor = new (class {
            [Symbol.iterator]() {
                return this;
            }
            next() {
                const value = outThis.iterator.next();
                let res = undefined;
                if (!value.done) {
                    res = callback(value.value, index++);
                }
                return {
                    done: value.done,
                    value: res,
                };
            }
        })();
        return new Stream(itor);
    }
    flatMap(callback) {
        let index = 0;
        const outThis = this;
        let currentValue = { done: false, value: [] };
        const iterator = new (class {
            [Symbol.iterator]() {
                return this;
            }
            next() {
                if (currentValue.value.length > 0) { // already read a value from the result which is parsed from out iterator and the left result.length > 1
                    const value = currentValue.value.shift();
                    return {
                        done: false,
                        value
                    };
                }
                else {
                    const value = outThis.iterator.next(); // second branch read a value from out iterator
                    if (value.done) { // the out iterator is empty
                        return {
                            done: true,
                            value: undefined
                        };
                    }
                    // get result from out iterator
                    currentValue = {
                        value: [...callback(value.value, index++)],
                        done: value.done,
                    };
                    if (currentValue.value.length === 0) { // current result from out iterator is [], go to the second branch again
                        return {
                            done: false,
                            value: undefined
                        };
                    }
                    else { // current result.length > 1, shift one element, go to the first branch
                        return {
                            done: false,
                            value: currentValue.value.shift()
                        };
                    }
                }
            }
        })();
        // genius work!
        return new Stream(iterator).filter((item) => item !== undefined);
    }
    filter(callback) {
        let index = 0;
        const outThis = this;
        const itor = new (class {
            [Symbol.iterator]() {
                return this;
            }
            next() {
                let valueFiltered;
                while (true) {
                    const value = outThis.iterator.next();
                    valueFiltered = value;
                    if (value.done) {
                        // iterator done
                        valueFiltered = value;
                        break;
                    }
                    else {
                        // check filter
                        if (callback(value.value, index++)) {
                            valueFiltered = value;
                            break;
                        }
                    }
                }
                return valueFiltered;
            }
        })();
        return new Stream(itor);
    }
    collect() {
        const res = [];
        for (let item of this.iterator) {
            res.push(item);
        }
        return res;
    }
    groupBy(callback) {
        const result = {};
        const keys = [];
        this.each((item, index) => {
            const key = callback(item, index);
            const value = result[key];
            if (value) {
                value.push(item);
            }
            else {
                result[key] = [item];
                keys.push(key);
            }
        });
        return new DictionaryStream(Stream.of(keys).map((key) => {
            const value = [key, result[key]];
            return value;
        }));
    }
}
exports.Stream = Stream;
class DictionaryStream extends Stream {
    constructor(stream) {
        super(stream.iterator);
    }
    toDict() {
        const result = {};
        this.each((item) => {
            result[item[0]] = item[1];
        });
        return result;
    }
}
exports.DictionaryStream = DictionaryStream;
