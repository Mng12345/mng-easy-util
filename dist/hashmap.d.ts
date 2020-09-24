declare type basic = number | string;
export interface HashCode {
    hashCode(): string;
}
declare type Key = basic | HashCode;
export declare class HashMap<K extends Key, V> implements Map<K, V> {
    private map;
    private keyMap;
    private readonly hashCode;
    constructor();
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
