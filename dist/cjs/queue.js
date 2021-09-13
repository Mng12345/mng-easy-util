"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleQueue = void 0;
const linked_1 = require("./algorithm/linked");
class SimpleQueue {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    add(value) {
        const node = new linked_1.LinkedNode(value);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.addNode(node);
            this.tail = node;
        }
        this.size++;
    }
    take() {
        if (this.head === null)
            return null;
        const head = this.head;
        const nextHead = head.next;
        head.remove();
        this.head = nextHead;
        if (this.size > 0)
            this.size--;
        return head.value;
    }
}
exports.SimpleQueue = SimpleQueue;
