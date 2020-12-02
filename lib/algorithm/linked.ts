// linked

export class LinkedNode<T> {
    value: T
    prev: LinkedNode<T>|null
    next: LinkedNode<T>|null

    constructor(value: T) {
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
    addNode(node: LinkedNode<T>) {
        // break the node's own collection
        node.prev = null;
        node.next = null;
        this.next = node;
        node.prev = this;
        return node;
    }

    /**
     * add value and break the linked collection
     * @template T
     * @param {T} value
     * @return {LinkedNode<T>}
     */
    addValue(value: T) {
        const node = new LinkedNode(value);
        this.next = node;
        node.prev = this;
        return node;
    }

    /**
     * insert a node, not break the collection
     * @template T
     * @param {Node<T>} node
     */
    insertNode(node: LinkedNode<T>) {
        this.insertValue(node.value);
    }

    /**
     * insert value, not break the collection
     * @template T
     * @param {T} value
     */
    insertValue(value: T) {
        const node = new LinkedNode(value);
        const next = this.next;
        this.next = node;
        node.prev = this;
        node.next = next;
        if (next !== null) {
            next.prev = node;
        }
    }

    /**
     * remove current node in the linked collection, and return [prev, next] nodes
     * @return [Node<T>|null, Node<T>|null]
     */
    remove() {
        const prev = this.prev;
        const next = this.next;
        this.prev = null;
        this.next = null;
        if (prev !== null) {
            prev.next = next;
            if (next !== null) {
                next.prev = prev;
            }
        } else {
            if (next !== null) {
                next.prev = prev;
            }
        }
        return [prev, next];
    }

    /**
     * @template T
     * @param {boolean} reverse
     * @return {T[]}
     */
    toArray(reverse: boolean=false) {
        const res: T[] = [];
        if (this.prev === null) {
            // this is the head
            let head: LinkedNode<T>|null = this;
            while (head !== null) {
                res.push(head.value);
                head = head.next;
            }
            return reverse ? res.reverse() : res;
        } else if (this.next === null) {
            // this is the tail
            let tail: LinkedNode<T>|null = this;
            while (tail !== null) {
                res.push(tail.value);
                tail = tail.prev;
            }
            return reverse ? res : res.reverse();
        } else if (reverse) {
            const prev = this.prev;
            const next = this.next;
            // make this to be tail
            this.next = null;
            const reversedLeft: T[] = this.toArray(true);
            this.next = next;
            // make this to head
            this.prev = null;
            const right: T[] = this.toArray(true);
            // repair this
            this.prev = prev;
            this.next = next;
            return right.concat(reversedLeft.slice(1));
        } else {
            const prev = this.prev;
            const next = this.next;
            // make this to be tail
            this.next = null;
            const left: T[] = this.toArray();
            this.next = next;
            // make this to be head
            this.prev = null;
            const right: T[] = this.toArray();
            // repair this
            this.prev = prev;
            this.next = next;
            return left.concat(right.slice(1));
        }
    }

    toString() {
        return `{value: ${this.value}, prev: ${this.prev ? this.prev.value : null}, next: ${this.next ? this.next.value : null}}`;
    }
}
