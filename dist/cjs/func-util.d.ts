/**
 * utils for limiting func call once, call func called count
 */
export declare class FuncClassTrace {
    private static trace;
    static getCalledCount(name: string): number;
    static doOneTime(func: () => void, name: string): void;
    static clear(name?: string): void;
    static callCount(func: () => void, name: string): void;
}
export declare const copyFunc: (func: (...args: any[]) => any) => (...args: any[]) => void;
