export declare type Handler = (...args: any[]) => void;
export declare type AsyncHandler = (...args: any[]) => Promise<void>;
export declare class Observer {
    private handlers;
    constructor();
    on(event: string, fn: Handler | AsyncHandler, priority?: number): void;
    fire(event: string, ...args: any[]): void;
    fireAsync(event: string, ...args: any[]): Promise<void>;
    free({ event, handler, priority }: {
        event?: string;
        handler?: Handler | AsyncHandler;
        priority?: number;
    }): void;
}
