export interface RunnerI<T> {
    status: 'pending' | 'done' | 'reject' | 'init';
    run(...args: any[]): Promise<T>;
    init(): Promise<void>;
    wait(timeout: number): Promise<void>; /**wait runner to completed with timeout*/
}
export declare class Runner<T> implements RunnerI<T> {
    runHook: () => Promise<T>;
    initHook: () => Promise<void>;
    status: "pending" | "done" | "reject" | "init";
    constructor(runHook: () => Promise<T>, initHook: () => Promise<void>);
    run(...args: any[]): Promise<T>;
    init(): Promise<void>;
    wait(timeout: number): Promise<void>;
}
/**
 * async run the runners with batch
 * @template T
 * @param {number} batch
 * @param {RunnerI<T>[]} runners
 * @return {Promise<T[]>}
 */
export declare const runBatch: <T>(batch: number, runners: RunnerI<T>[]) => Promise<T[]>;
/**
 * get num available runners within timeout ms
 * @template T
 * @param {RunnerI<T>[]} runners
 * @param {number} num
 * @param {number} timeout
 */
export declare const getAvailableRunners: <T>(runners: RunnerI<T>[], num: number, timeout: number) => Promise<RunnerI<T>[]>;
