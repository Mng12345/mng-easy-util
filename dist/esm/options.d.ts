export declare class Option<T> {
    private value;
    private constructor();
    static of<T>(v: T): Option<T>;
    static empty<T>(): Option<T>;
    expect(info: string): T;
    unwrap(): T;
    get(): T | null;
    isEmpty(): boolean;
    hasValue(): boolean;
}
