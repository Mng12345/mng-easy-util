// async runner utils
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
/**
 * @deprecated
 */
export class Runner {
    constructor(runHook, initHook) {
        this.runHook = runHook;
        this.initHook = initHook;
        this.status = 'init';
    }
    run(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = 'pending';
            try {
                const result = yield this.runHook();
                this.status = 'done';
                return result;
            }
            catch (e) {
                this.status = 'reject';
                return Promise.reject(e);
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = 'init';
            yield this.initHook();
        });
    }
    wait(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            return new Promise((resolve, reject) => {
                // wait runner completed
                const waitTimeout = () => {
                    const endTime = new Date().getTime();
                    if (endTime - startTime > timeout) {
                        reject(`failed to restore runner with timeout: ${endTime - startTime}ms`);
                        return;
                    }
                    if (this.status === 'done') {
                        resolve();
                        return;
                    }
                    else {
                        setTimeout(waitTimeout, 10);
                    }
                };
                waitTimeout();
            });
        });
    }
}
/**
 * async run the runners with batch
 * @deprecated
 * @template T
 * @param {number} batch
 * @param {RunnerI<T>[]} runners
 * @return {Promise<T[]>}
 */
export const runBatch = (batch, runners) => __awaiter(void 0, void 0, void 0, function* () {
    if (runners.find((runner) => runner.status !== 'init')) {
        throw new Error(`the status of each runners must be 'init' before runBatch`);
    }
    let runnerBatch = [];
    const runnerResults = [];
    for (let i = 0; i < runners.length; i++) {
        if (runnerBatch.length < batch) {
            runnerBatch.push(runners[i]);
        }
        else {
            const batchResult = yield Promise.all(runnerBatch.map((runner) => runner.run()));
            runnerResults.push(...batchResult);
            runnerBatch = [runners[i]];
        }
    }
    if (runnerBatch.length !== 0) {
        const batchResult = yield Promise.all(runnerBatch.map((runner) => runner.run()));
        runnerResults.push(...batchResult);
    }
    return runnerResults;
});
/**
 * get num available runners within timeout ms
 * @deprecated
 * @template T
 * @param {RunnerI<T>[]} runners
 * @param {number} num
 * @param {number} timeout
 */
export const getAvailableRunners = (runners, num, timeout) => __awaiter(void 0, void 0, void 0, function* () {
    if (num > runners.length) {
        throw new Error(`can not get more than the length of runners available runners`);
    }
    return new Promise((resolve, reject) => {
        const startTime = new Date().getTime();
        const deltaTime = 10;
        const getRunners = () => {
            const endTime = new Date().getTime();
            if (endTime - startTime > timeout) {
                reject(`getting ${num} runners with timeout: ${timeout}ms`);
                return;
            }
            const completedRunners = runners.filter((runner) => runner.status === 'done');
            if (completedRunners.length >= num) {
                resolve(completedRunners.slice(0, num));
            }
            else {
                setTimeout(getRunners, deltaTime);
            }
        };
        getRunners();
    });
});
/**
 * AsyncRunners for easy use
 */
export class AsyncRunner {
    constructor(batch, runners) {
        this.batch = batch;
        this.runners = runners;
        this.status = 'init';
        this.calledReset = false;
        this.result = [];
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.calledReset)
                return;
            this.calledReset = true;
            if (this.status === 'running') {
                yield this.stop();
            }
            else if (this.status === 'stopping') {
                // async wait for status to be 'stopped'
                // @ts-ignore
                while (this.status !== 'stopped') {
                    yield sleep(10);
                }
            }
            this.runners = [];
            this.result = [];
            this.status = 'init';
        });
    }
    add(...runner) {
        this.runners.push(...runner);
        return this;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.status === 'stopped')
                return;
            this.status = 'stopping';
            while (this.status === 'stopping') {
                yield sleep(10);
            }
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = 'running';
            let unitRunners = [];
            this.result = [];
            while (this.runners.length > 0) {
                // @ts-ignore
                if (this.status === 'stopping') {
                    break;
                }
                if (unitRunners.length < this.batch) {
                    const headRunner = this.runners.shift();
                    unitRunners.push(headRunner);
                }
                else {
                    const unitResult = yield Promise.all(unitRunners.map((runner) => runner()));
                    this.result.push(...unitResult);
                    unitRunners = [];
                }
            }
            if (unitRunners.length > 0 && this.status === 'running') {
                const unitResult = yield Promise.all(unitRunners.map((runner) => runner()));
                this.result.push(...unitResult);
            }
            this.status = 'stopped';
            return this.result;
        });
    }
}
