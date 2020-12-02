// lru cache with timeout

import {LinkedNode} from "./linked";

type Entry<K, V> = {
    key: K
    value: V
    keyStr: string
};

type EntryNode<K, V> = LinkedNode<Entry<K, V>>;

export class Lru<K, V> {

    cache: Map<string, EntryNode<K, V>> = new Map<string, EntryNode<K, V>>();
    tailNode: EntryNode<K, V>|undefined
    headNode: EntryNode<K, V>|undefined

    constructor(public cacheSize: number, public keyExtractor: (key: K) => string) {
    }

    /**
     * put the value in the tail, if this cache size >= cacheSize, remove the first node
     * @template K, V
     * @param {K} key
     * @param {V} value
     */
    put(key: K, value: V) {
        if (this.size() >= this.cacheSize) {
            // remove the first node
            const entryNode = this.headNode!;
            const keyStr = entryNode.value.keyStr;
            this.headNode = entryNode.next!;
            this.headNode.prev = null;
            this.cache.delete(keyStr);
        }
        const keyStr = this.keyExtractor(key);
        const node = new LinkedNode({
            key, value, keyStr
        });
        if (this.headNode === undefined || this.tailNode === undefined) {
            this.headNode = node;
            this.tailNode = node;
        } else {
            this.tailNode.addNode(node);
            this.tailNode = node;
        }
        this.cache.set(keyStr, node);
    }

    size() {
        return this.cache.size;
    }

    /**
     * if key already exists in the cache, put the node to the tail, else return null
     * @template K, V
     * @param {K} key
     * @return {V|null}
     */
    get(key: K): V|null {
        const keyStr = this.keyExtractor(key);
        if (this.cache.has(keyStr)) {
            const node = this.cache.get(keyStr)!;
            // remove the node from it's own collection
            node.remove();
            // add node to the tail
            if (this.headNode === node) {
                this.headNode = this.tailNode;
                this.tailNode!.addNode(node);
                this.tailNode = node;
            } else if (this.tailNode === node) {
                // nothing need to do.
            } else {
                this.tailNode!.addNode(node);
                this.tailNode = node;
            }
            return node.value.value;
        } else return null;
    }
}
