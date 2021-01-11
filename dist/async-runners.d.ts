/**
 * @deprecated
 */
export interface RunnerI<T> {
    status: 'pending' | 'done' | 'reject' | 'init';
    run(...args: any[]): Promise<T>;
    init(): Promise<void>;
    wait(timeout: number): Promise<void>; /**wait runner to completed with timeout*/
}
/**
 * @deprecated
 */
export declare class Runner<T> implements RunnerI<T> {
    runHook: () => Promise<T>;
    initHook: () => Promise<void>;
    status: 'pending' | 'done' | 'reject' | 'init';
    constructor(runHook: () => Promise<T>, initHook: () => Promise<void>);
    run(...args: any[]): Promise<T>;
    init(): Promise<void>;
    wait(timeout: number): Promise<void>;
}
/**
 * async run the runners with batch
 * @deprecated
 * @template T
 * @param {number} batch
 * @param {RunnerI<T>[]} runners
 * @return {Promise<T[]>}
 */
export declare const runBatch: <T>(batch: number, runners: RunnerI<T>[]) => Promise<T[]>;
/**
 * get num available runners within timeout ms
 * @deprecated
 * @template T
 * @param {RunnerI<T>[]} runners
 * @param {number} num
 * @param {number} timeout
 */
export declare const getAvailableRunners: <T>(runners: RunnerI<T>[], num: number, timeout: number) => Promise<RunnerI<T>[]>;
export declare type RunnerFunc<T> = () => Promise<T>;
/**
 * AsyncRunners for easy use
 */
export declare class AsyncRunners<T> {
    batch: number;
    runners: RunnerFunc<T>[];
    private status;
    private calledReset;
    result: T[];
    constructor(batch: number, runners: RunnerFunc<T>[]);
    reset(): Promise<void>;
    add(...runner: RunnerFunc<T>[]): this;
    stop(): Promise<void>;
    run(): Promise<T[]>;
}
