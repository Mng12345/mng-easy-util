import { LinkedNode } from "./algorithm/linked";
export interface Queue<T> {
    size: number;
    add(value: T): void;
    take(): T | null;
}
export declare class SimpleQueue<T> implements Queue<T> {
    size: number;
    head: LinkedNode<T> | null;
    tail: LinkedNode<T> | null;
    constructor();
    add(value: T): void;
    take(): T | null;
}
