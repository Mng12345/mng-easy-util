import { basic, Key } from './hashmap';
export declare class HashSet<K extends Key> implements Set<K> {
    private hashCodeSet;
    private hashCodeObjMap;
    constructor();
    [Symbol.iterator](): IterableIterator<K>;
    entries(): IterableIterator<[K, K]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<K>;
    [Symbol.toStringTag]: string;
    size: number;
    hashCode(obj: K): basic;
    add(value: K): this;
    clear(): void;
    delete(value: K): boolean;
    forEach(callbackfn: (value: K, value2: K, set: Set<K>) => void, thisArg?: any): void;
    has(value: K): boolean;
}
