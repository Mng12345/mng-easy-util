"use strict";
// lru cache with timeout
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lru = void 0;
var linked_1 = require("./linked");
var Lru = /** @class */ (function () {
    function Lru(cacheSize, keyExtractor) {
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
    Lru.prototype.put = function (key, value) {
        if (this.size() >= this.cacheSize) {
            // remove the first node
            var entryNode = this.headNode;
            var keyStr_1 = entryNode.value.keyStr;
            this.headNode = entryNode.next;
            this.headNode.prev = null;
            this.cache.delete(keyStr_1);
        }
        var keyStr = this.keyExtractor(key);
        var node = new linked_1.LinkedNode({
            key: key,
            value: value,
            keyStr: keyStr,
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
    };
    Lru.prototype.size = function () {
        return this.cache.size;
    };
    /**
     * if key already exists in the cache, put the node to the tail, else return null
     * @template K, V
     * @param {K} key
     * @return {V|null}
     */
    Lru.prototype.get = function (key) {
        var keyStr = this.keyExtractor(key);
        if (this.cache.has(keyStr)) {
            var node = this.cache.get(keyStr);
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
    };
    return Lru;
}());
exports.Lru = Lru;
