import { isBasic } from './hashmap';
export class HashSet {
    constructor() {
        this.hashCodeSet = new Set();
        this.hashCodeObjMap = new Map();
        this.size = this.hashCodeSet.size;
    }
    [Symbol.iterator]() {
        return this.hashCodeObjMap.values();
    }
    entries() {
        const valueIterator = this.hashCodeObjMap.values();
        return new (class {
            next() {
                const value = valueIterator.next();
                return {
                    done: value.done,
                    value: [value.value, value.value],
                };
            }
            [Symbol.iterator]() {
                return this;
            }
        })();
    }
    keys() {
        return this.hashCodeObjMap.values();
    }
    values() {
        return this.hashCodeObjMap.values();
    }
    hashCode(obj) {
        if (isBasic(obj)) {
            return obj;
        }
        else {
            return obj.hashCode();
        }
    }
    add(value) {
        let code = this.hashCode(value);
        this.hashCodeSet.add(code);
        this.hashCodeObjMap.set(code, value);
        this.size = this.hashCodeSet.size;
        return this;
    }
    clear() {
        this.hashCodeSet.clear();
        this.hashCodeObjMap.clear();
        this.size = this.hashCodeSet.size;
    }
    delete(value) {
        const code = this.hashCode(value);
        const flag = this.hashCodeSet.delete(code);
        this.hashCodeObjMap.delete(code);
        this.size = this.hashCodeSet.size;
        return flag;
    }
    forEach(callbackfn, thisArg) {
        this.hashCodeObjMap.forEach((value, key, map) => {
            callbackfn(value, value, this);
        });
    }
    has(value) {
        return this.hashCodeSet.has(this.hashCode(value));
    }
}
