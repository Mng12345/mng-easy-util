export declare class Stream<T> {
    iterator: IterableIterator<T>;
    constructor(data: ArrayLike<T> | IterableIterator<T>);
    static of<T>(data: ArrayLike<T> | IterableIterator<T>): Stream<T>;
    each(callback: (item: T) => void): void;
    map<R>(callback: (item: T) => R): Stream<R>;
    filter(callback: (item: T) => boolean): Stream<T>;
    collect(): T[];
}
