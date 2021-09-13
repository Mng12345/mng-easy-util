"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncPool = void 0;
const lodash_1 = require("lodash");
const file_1 = require("./file");
const chalk_1 = __importDefault(require("chalk"));
const throttleLog = lodash_1.throttle((...data) => console.log(...data), 2000);
class AsyncPool {
    constructor(size) {
        this.size = size;
        this.taskCount = 0;
        this.taskMap = new Map();
        this.resultMap = new Map();
        this.buffer = [];
    }
    pushInner(task, taskId) {
        if (this.taskMap.has(taskId)) {
            console.log(chalk_1.default.red(`warning: task with taskId[${taskId}] already exists, please check your code!`));
            return;
        }
        const voidTask = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield task();
                this.resultMap.set(taskId, {
                    taskId,
                    result,
                    error: undefined,
                });
            }
            catch (e) {
                this.resultMap.set(taskId, {
                    taskId,
                    result: undefined,
                    error: e,
                });
                console.log(chalk_1.default.yellow(`task[${taskId}] has failed with error:\n`));
                console.log(e);
            }
        });
        if (this.taskMap.size < this.size) {
            this.taskMap.set(taskId, {
                taskId,
                status: 'running',
            });
            voidTask().finally(() => {
                this.taskMap.delete(taskId);
            });
        }
        else {
            this.buffer.push({
                taskId,
                task,
            });
        }
    }
    push(task, taskId) {
        this.pushInner(task, taskId);
        this.taskCount += 1;
    }
    wait() {
        return __awaiter(this, void 0, void 0, function* () {
            for (;;) {
                if (this.taskMap.size < this.size && this.buffer.length > 0) {
                    const wrappedTask = this.buffer.shift();
                    this.pushInner(wrappedTask.task, wrappedTask.taskId);
                }
                else if (this.taskMap.size === 0 && this.buffer.length === 0) {
                    // all task done.
                    throttleLog(`async pool status: ${chalk_1.default.greenBright(this.taskMap.size)} tasks running, ${chalk_1.default.yellow(this.buffer.length)} tasks waiting, already processed ${chalk_1.default.blue(`${this.resultMap.size}/${this.taskCount}`)}.`);
                    yield file_1.sleep(2000);
                    console.log(chalk_1.default.green(`all tasks done.`));
                    break;
                }
                else {
                    // wait for all task done.
                    throttleLog(`async pool status: ${chalk_1.default.greenBright(this.taskMap.size)} tasks running, ${chalk_1.default.yellow(this.buffer.length)} tasks waiting, already processed ${chalk_1.default.blue(`${this.resultMap.size}/${this.taskCount}`)}.`);
                    yield file_1.sleep(50);
                }
            }
        });
    }
}
exports.AsyncPool = AsyncPool;
