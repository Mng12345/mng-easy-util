"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleQueue = void 0;
var linked_1 = require("./algorithm/linked");
var SimpleQueue = /** @class */ (function () {
    function SimpleQueue() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    SimpleQueue.prototype.add = function (value) {
        var node = new linked_1.LinkedNode(value);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.addNode(node);
            this.tail = node;
        }
        this.size++;
    };
    SimpleQueue.prototype.take = function () {
        if (this.head === null)
            return null;
        var head = this.head;
        var nextHead = head.next;
        head.remove();
        this.head = nextHead;
        if (this.size > 0)
            this.size--;
        return head.value;
    };
    return SimpleQueue;
}());
exports.SimpleQueue = SimpleQueue;
