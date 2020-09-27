export type basic = number | string

export interface HashCode {
    hashCode(): string;
}

export type Key = basic | HashCode;

export function isBasic(obj: any): obj is basic {
    return typeof obj === 'string' || typeof obj === 'number';
}

export class HashMap<K extends Key, V> implements Map<K, V>{

    private map: Map<basic, V> = new Map();
    // store key and hashcode
    private keyMap: Map<basic, K> = new Map();

    private readonly hashCode: (object: K) => basic = object => {
        if (typeof object === "number" || typeof object === "string") {
            return object;
        }
        // force the object key must have hashCode method
        if ((object as HashCode).hashCode === undefined) {
            throw new Error(`if the type of key is object, it must have hashCode method`);
        }
        return (object as HashCode).hashCode();
    }

    constructor() {
        this.size = this.map.size;
    }

    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.entries();
    }

    entries (): IterableIterator<[K, V]> {
        const keyIterator = this.keys();
        const valueIterator = this.values();
        return new class implements IterableIterator<[K, V]> {
            next(): IteratorResult<[K, V], any> {
                const keyItorVal = keyIterator.next();
                const valueItorVal = valueIterator.next();
                return {
                    done: keyItorVal.done,
                    value: [keyItorVal.value, valueItorVal.value]
                };
            }
            [Symbol.iterator](): IterableIterator<[K, V]> {
                return this;
            }
        }
    }

    keys(): IterableIterator<K> {
        return this.keyMap.values();
    }

    values(): IterableIterator<V> {
        return this.map.values();
    }

    [Symbol.toStringTag]: string;

    size: number;

    clear(): void {
        this.map.clear();
        this.size = this.map.size;
    }

    delete(key: K): boolean {
        const hashCode = this.hashCode(key);
        this.keyMap.delete(hashCode);
        const deleteFlag = this.map.delete(this.hashCode(key));
        this.size = this.map.size;
        return deleteFlag;
    }

    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        this.map.forEach((value1, key1, map1) => {
            // get key
            const originalKey = this.keyMap.get(key1);
            if (typeof originalKey === undefined) {
                throw new Error(`can not find key ${key1} in HashMap's map`);
            }
            callbackfn(value1, originalKey!, this as unknown as Map<K, V>);
        })
    }

    get(key: K): V | undefined{
        return this.map.get(this.hashCode(key))
    }

    has(key: K): boolean {
        const hashCode = this.hashCode(key);
        return this.keyMap.has(hashCode);
    }

    set(key: K, value: V): this {
        const hashCode = this.hashCode(key);
        this.keyMap.set(hashCode, key);
        this.map.set(hashCode, value);
        this.size = this.map.size;
        return this;
    }

}

