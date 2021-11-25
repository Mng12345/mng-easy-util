export declare class SimpleWorker {
    worker: Worker;
    status: 'buzy' | 'ready' | 'error';
    error: Error | null;
    constructor(workerInfo: WorkerInfo);
    call<T, R>(message: T): Promise<R>;
    callTransfer<T, R>(message: T, transfers: ArrayBuffer[]): Promise<R>;
}
export declare class WorkerInfo {
    worker: Worker;
    createFunc: () => Worker;
    constructor(worker: Worker, createFunc: () => Worker);
}
export declare class WorkerPool {
    readyPool: SimpleWorker[];
    errorPool: SimpleWorker[];
    size: number;
    promises: Promise<any>[];
    allTaskNum: number;
    completedTaskNum: number;
    constructor(size: number, workerInfos: WorkerInfo[]);
    submit<T, R>(message: T): Promise<R>;
    submitTimeout<T, R>(message: T, timeout: number): Promise<R>;
    submitTransfer<T, R>(message: T, transfers: ArrayBuffer[]): Promise<R>;
    submitTransferTimeout<T, R>(message: T, transfers: ArrayBuffer[], timeout: number): Promise<R>;
    wait<R>(): Promise<any[]>;
}
