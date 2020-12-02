"use strict";
// linked
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedNode = void 0;
var LinkedNode = /** @class */ (function () {
    function LinkedNode(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
    /**
     * add a node and break the linked collection
     * @template T
     * @param {Node<T>} node
     * @return {LinkedNode<T>}
     */
    LinkedNode.prototype.addNode = function (node) {
        // break the node's own collection
        node.prev = null;
        node.next = null;
        this.next = node;
        node.prev = this;
        return node;
    };
    /**
     * add value and break the linked collection
     * @template T
     * @param {T} value
     * @return {LinkedNode<T>}
     */
    LinkedNode.prototype.addValue = function (value) {
        var node = new LinkedNode(value);
        this.next = node;
        node.prev = this;
        return node;
    };
    /**
     * insert a node, not break the collection
     * @template T
     * @param {Node<T>} node
     */
    LinkedNode.prototype.insertNode = function (node) {
        this.insertValue(node.value);
    };
    /**
     * insert value, not break the collection
     * @template T
     * @param {T} value
     */
    LinkedNode.prototype.insertValue = function (value) {
        var node = new LinkedNode(value);
        var next = this.next;
        this.next = node;
        node.prev = this;
        node.next = next;
        if (next !== null) {
            next.prev = node;
        }
    };
    /**
     * remove current node in the linked collection, and return [prev, next] nodes
     * @return [Node<T>|null, Node<T>|null]
     */
    LinkedNode.prototype.remove = function () {
        var prev = this.prev;
        var next = this.next;
        this.prev = null;
        this.next = null;
        if (prev !== null) {
            prev.next = next;
            if (next !== null) {
                next.prev = prev;
            }
        }
        else {
            if (next !== null) {
                next.prev = prev;
            }
        }
        return [prev, next];
    };
    /**
     * @template T
     * @param {boolean} reverse
     * @return {T[]}
     */
    LinkedNode.prototype.toArray = function (reverse) {
        if (reverse === void 0) { reverse = false; }
        var res = [];
        if (this.prev === null) {
            // this is the head
            var head = this;
            while (head !== null) {
                res.push(head.value);
                head = head.next;
            }
            return reverse ? res.reverse() : res;
        }
        else if (this.next === null) {
            // this is the tail
            var tail = this;
            while (tail !== null) {
                res.push(tail.value);
                tail = tail.prev;
            }
            return reverse ? res : res.reverse();
        }
        else if (reverse) {
            var prev = this.prev;
            var next = this.next;
            // make this to be tail
            this.next = null;
            var reversedLeft = this.toArray(true);
            this.next = next;
            // make this to head
            this.prev = null;
            var right = this.toArray(true);
            // repair this
            this.prev = prev;
            this.next = next;
            return right.concat(reversedLeft.slice(1));
        }
        else {
            var prev = this.prev;
            var next = this.next;
            // make this to be tail
            this.next = null;
            var left = this.toArray();
            this.next = next;
            // make this to be head
            this.prev = null;
            var right = this.toArray();
            // repair this
            this.prev = prev;
            this.next = next;
            return left.concat(right.slice(1));
        }
    };
    LinkedNode.prototype.toString = function () {
        return "{value: " + this.value + ", prev: " + (this.prev ? this.prev.value : null) + ", next: " + (this.next ? this.next.value : null) + "}";
    };
    return LinkedNode;
}());
exports.LinkedNode = LinkedNode;
