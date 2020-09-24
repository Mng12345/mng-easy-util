type basic = number | string

export class HashMap<K extends basic | object, V> implements Map<K, V>{

    private map: Map<basic, V> = new Map();
    // store key and hashcode
    private keyMap: Map<basic, K> = new Map();

    private readonly hashCode: (object: basic | object) => basic = object => {
        if (typeof object === "number" || typeof object === "string") {
            return object;
        }
        // todo need to develop better function for making the key to string
        return JSON.stringify(object);
    }

    constructor(config?: {hashCode: (object: basic | object) => basic}) {
        if (config !== undefined && config.hashCode && typeof config.hashCode === "function") {
            this.hashCode = config.hashCode;
        }
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
                return {
                    done: true,
                    value: [keyIterator.next(), valueIterator.next()]
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


