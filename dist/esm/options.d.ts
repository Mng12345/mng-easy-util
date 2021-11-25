export declare class Option<T> {
    value: T | null;
    private constructor();
    static of<T>(v: T): Option<T>;
    static empty<T>(): Option<T>;
    expect(info: string): T;
    unwrap(): T;
    get(): T | null;
}
