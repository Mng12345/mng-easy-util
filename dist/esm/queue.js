import { LinkedNode } from "./algorithm/linked";
export class SimpleQueue {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    add(value) {
        const node = new LinkedNode(value);
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
