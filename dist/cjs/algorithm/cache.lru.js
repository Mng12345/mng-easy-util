"use strict";
// lru cache with timeout
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lru = void 0;
const linked_1 = require("./linked");
class Lru {
    constructor(cacheSize, keyExtractor) {
        this.cacheSize = cacheSize;
        this.keyExtractor = keyExtractor;
        this.cache = new Map();
    }
    /**
     * put the value in the tail, if this cache size >= cacheSize, remove the first node
     * @template K, V
     * @param {K} key
     * @param {V} value
     */
    put(key, value) {
        if (this.size() >= this.cacheSize) {
            // remove the first node
            const entryNode = this.headNode;
            const keyStr = entryNode.value.keyStr;
            this.headNode = entryNode.next;
            this.headNode.prev = null;
            this.cache.delete(keyStr);
        }
        const keyStr = this.keyExtractor(key);
        const node = new linked_1.LinkedNode({
            key,
            value,
            keyStr,
        });
        if (this.headNode === undefined || this.tailNode === undefined) {
            this.headNode = node;
            this.tailNode = node;
        }
        else {
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
    get(key) {
        const keyStr = this.keyExtractor(key);
        if (this.cache.has(keyStr)) {
            const node = this.cache.get(keyStr);
            // remove the node from it's own collection
            node.remove();
            // add node to the tail
            if (this.headNode === node) {
                this.headNode = this.tailNode;
                this.tailNode.addNode(node);
                this.tailNode = node;
            }
            else if (this.tailNode === node) {
                // nothing need to do.
            }
            else {
                this.tailNode.addNode(node);
                this.tailNode = node;
            }
            return node.value.value;
        }
        else
            return null;
    }
}
exports.Lru = Lru;
