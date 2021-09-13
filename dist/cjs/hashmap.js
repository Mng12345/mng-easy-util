"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashMap = exports.isBasic = void 0;
function isBasic(obj) {
    return typeof obj === 'string' || typeof obj === 'number';
}
exports.isBasic = isBasic;
class HashMap {
    constructor() {
        this.map = new Map();
        // store key and hashcode
        this.keyMap = new Map();
        this.hashCode = (object) => {
            if (typeof object === 'number' || typeof object === 'string') {
                return object;
            }
            // force the object key must have hashCode method
            if (object.hashCode === undefined) {
                throw new Error(`if the type of key is object, it must have hashCode method`);
            }
            return object.hashCode();
        };
        this.size = this.map.size;
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    entries() {
        const keyIterator = this.keys();
        const valueIterator = this.values();
        return new (class {
            next() {
                const keyItorVal = keyIterator.next();
                const valueItorVal = valueIterator.next();
                return {
                    done: keyItorVal.done,
                    value: [keyItorVal.value, valueItorVal.value],
                };
            }
            [Symbol.iterator]() {
                return this;
            }
        })();
    }
    keys() {
        return this.keyMap.values();
    }
    values() {
        return this.map.values();
    }
    clear() {
        this.keyMap.clear();
        this.map.clear();
        this.size = this.map.size;
    }
    delete(key) {
        const hashCode = this.hashCode(key);
        this.keyMap.delete(hashCode);
        const deleteFlag = this.map.delete(this.hashCode(key));
        this.size = this.map.size;
        return deleteFlag;
    }
    forEach(callbackfn, thisArg) {
        this.map.forEach((value1, key1, map1) => {
            // get key
            const originalKey = this.keyMap.get(key1);
            if (typeof originalKey === undefined) {
                throw new Error(`can not find key ${key1} in HashMap's map`);
            }
            callbackfn(value1, originalKey, this);
        });
    }
    get(key) {
        return this.map.get(this.hashCode(key));
    }
    has(key) {
        const hashCode = this.hashCode(key);
        return this.keyMap.has(hashCode);
    }
    set(key, value) {
        const hashCode = this.hashCode(key);
        this.keyMap.set(hashCode, key);
        this.map.set(hashCode, value);
        this.size = this.map.size;
        return this;
    }
}
exports.HashMap = HashMap;
