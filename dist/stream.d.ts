export declare class Stream<T> {
    iterator: IterableIterator<T>;
    constructor(data: ArrayLike<T> | IterableIterator<T>);
    static of<T>(data: ArrayLike<T> | IterableIterator<T>): Stream<T>;
    each(callback: (item: T, index?: number) => void): void;
    forEach(callback: (item: T, index?: number) => void): void;
    map<R>(callback: (item: T, index?: number) => R): Stream<R>;
    flatMap<R>(callback: (item: T, index?: number) => R[]): Stream<R>;
    filter(callback: (item: T, index?: number) => boolean): Stream<T>;
    collect(): T[];
    groupBy<K extends string | number, R extends [K, T[]]>(callback: (item: T, index?: number) => K): DictionaryStream<K, T>;
}
export declare class DictionaryStream<K extends number | string, T> extends Stream<[
    K,
    T[]
]> {
    constructor(stream: Stream<[K, T[]]>);
    toDict(): { [index in K]: T[]; };
}
