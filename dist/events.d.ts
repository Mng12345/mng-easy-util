export declare type Handler = (...args: any[]) => void;
export declare class Observer {
    private handlers;
    constructor();
    on(event: string, fn: Handler): void;
    fire(event: string, ...args: any[]): void;
}
