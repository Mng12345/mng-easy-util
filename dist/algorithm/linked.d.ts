export declare class LinkedNode<T> {
    value: T;
    prev: LinkedNode<T> | null;
    next: LinkedNode<T> | null;
    constructor(value: T);
    /**
     * add a node and break the linked collection
     * @template T
     * @param {Node<T>} node
     * @return {LinkedNode<T>}
     */
    addNode(node: LinkedNode<T>): LinkedNode<T>;
    /**
     * add value and break the linked collection
     * @template T
     * @param {T} value
     * @return {LinkedNode<T>}
     */
    addValue(value: T): LinkedNode<T>;
    /**
     * insert a node, not break the collection
     * @template T
     * @param {Node<T>} node
     */
    insertNode(node: LinkedNode<T>): void;
    /**
     * insert value, not break the collection
     * @template T
     * @param {T} value
     */
    insertValue(value: T): void;
    /**
     * remove current node in the linked collection, and return [prev, next] nodes
     * @return [Node<T>|null, Node<T>|null]
     */
    remove(): (LinkedNode<T> | null)[];
    /**
     * @template T
     * @param {boolean} reverse
     * @return {T[]}
     */
    toArray(reverse?: boolean): T[];
    toString(): string;
}
