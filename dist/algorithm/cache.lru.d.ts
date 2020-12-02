import { LinkedNode } from "./linked";
declare type Entry<K, V> = {
    key: K;
    value: V;
    keyStr: string;
};
declare type EntryNode<K, V> = LinkedNode<Entry<K, V>>;
export declare class Lru<K, V> {
    cacheSize: number;
    keyExtractor: (key: K) => string;
    cache: Map<string, EntryNode<K, V>>;
    tailNode: EntryNode<K, V> | undefined;
    headNode: EntryNode<K, V> | undefined;
    constructor(cacheSize: number, keyExtractor: (key: K) => string);
    /**
     * put the value in the tail, if this cache size >= cacheSize, remove the first node
     * @template K, V
     * @param {K} key
     * @param {V} value
     */
    put(key: K, value: V): void;
    size(): number;
    /**
     * if key already exists in the cache, put the node to the tail, else return null
     * @template K, V
     * @param {K} key
     * @return {V|null}
     */
    get(key: K): V | null;
}
export {};
