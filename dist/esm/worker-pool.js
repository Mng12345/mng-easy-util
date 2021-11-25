var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sleep } from './sleep';
export class SimpleWorker {
    constructor(workerInfo) {
        this.status = 'ready';
        this.error = null;
        this.worker = workerInfo.worker;
    }
    call(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callTransfer(message, []);
        });
    }
    callTransfer(message, transfers) {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = 'buzy';
            return new Promise((resolve, reject) => {
                this.worker.onmessage = (data) => {
                    this.status = 'ready';
                    resolve(data.data);
                };
                this.worker.postMessage(message, transfers);
            }).catch((err) => {
                this.status = 'error';
                this.error = err;
                throw new Error(err);
            });
        });
    }
}
export class WorkerInfo {
    constructor(worker, createFunc) {
        this.worker = worker;
        this.createFunc = createFunc;
    }
}
export class WorkerPool {
    constructor(size, workerInfos) {
        this.readyPool = [];
        this.errorPool = [];
        this.promises = [];
        this.allTaskNum = 0;
        this.completedTaskNum = 0;
        this.size = size;
        for (const workerInfo of workerInfos) {
            this.readyPool.push(new SimpleWorker(workerInfo));
        }
    }
    submit(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.submitTransfer(message, []);
        });
    }
    submitTimeout(message, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.submitTransferTimeout(message, [], timeout);
        });
    }
    submitTransfer(message, transfers) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.submitTransferTimeout(message, transfers, -1);
        });
    }
    submitTransferTimeout(message, transfers, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            this.allTaskNum += 1;
            let promise;
            if (timeout === -1) {
                promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    if (this.readyPool.length === 0) {
                        // waitting for ready pool
                        for (;;) {
                            yield sleep(10);
                            if (this.readyPool.length !== 0) {
                                break;
                            }
                        }
                    }
                    const worker = this.readyPool.shift();
                    try {
                        const result = yield worker.callTransfer(message, transfers);
                        this.readyPool.push(worker);
                        this.completedTaskNum += 1;
                        resolve(result);
                    }
                    catch (e) {
                        this.errorPool.push(worker);
                    }
                }));
            }
            else {
                promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    if (this.readyPool.length === 0) {
                        let currTime = 0;
                        const waitPerCycle = 10;
                        // waitting for ready pool
                        for (;;) {
                            yield sleep(waitPerCycle);
                            currTime += waitPerCycle;
                            if (currTime > timeout) {
                                return reject(`submit timeout in ${timeout}`);
                            }
                            if (this.readyPool.length !== 0) {
                                break;
                            }
                        }
                    }
                    const worker = this.readyPool.shift();
                    try {
                        const result = yield worker.callTransfer(message, transfers);
                        console.log(`result:`, result);
                        this.readyPool.push(worker);
                        this.completedTaskNum += 1;
                        resolve(result);
                    }
                    catch (e) {
                        this.errorPool.push(worker);
                    }
                }));
            }
            this.promises.push(promise);
            return yield promise;
        });
    }
    wait() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(this.promises);
        });
    }
}
