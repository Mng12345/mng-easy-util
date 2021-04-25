export declare type MetaTask = {
    taskId: string;
    status: 'running' | 'stopped';
};
export declare type VoidTask = () => Promise<void>;
export declare type Task<R> = () => Promise<R>;
export declare type WrappedTask<R> = {
    taskId: string;
    task: Task<R>;
};
export declare type TaskResult<R> = {
    taskId: string;
    result?: R;
    error?: any;
};
export declare class AsyncPool<R> {
    size: number;
    taskCount: number;
    taskMap: Map<string, MetaTask>;
    resultMap: Map<string, TaskResult<R>>;
    buffer: WrappedTask<R>[];
    constructor(size: number);
    private pushInner;
    push(task: Task<R>, taskId: string): void;
    wait(): Promise<void>;
}
