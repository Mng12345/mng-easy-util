declare type basic = number | string;
export declare class HashMap<K extends basic | object, V> implements Map<K, V> {
    private map;
    private keyMap;
    private readonly hashCode;
    constructor(config?: {
        hashCode: (object: basic | object) => basic;
    });
    [Symbol.iterator](): IterableIterator<[K, V]>;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    [Symbol.toStringTag]: string;
    size: number;
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
}
export {};
