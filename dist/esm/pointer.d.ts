export declare class Pointer<T> {
    valueContainer: T[];
    static of<T>(value: T): Pointer<T>;
    static empty<T>(): Pointer<T>;
    get(): T;
    assign(value: T): void;
}
