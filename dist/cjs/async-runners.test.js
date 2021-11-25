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
Object.defineProperty(exports, "__esModule", { value: true });
const async_runners_1 = require("./async-runners");
const sleep_1 = require("./sleep");
const stream_1 = require("./stream");
const math_1 = require("./math");
test('runBatch & getAvailableRunners', () => __awaiter(void 0, void 0, void 0, function* () {
    const runners = [
        new async_runners_1.Runner(() => __awaiter(void 0, void 0, void 0, function* () {
            return yield sleep_1.sleep(1000);
        }), () => __awaiter(void 0, void 0, void 0, function* () { })),
        new async_runners_1.Runner(() => __awaiter(void 0, void 0, void 0, function* () {
            return yield sleep_1.sleep(1000);
        }), () => __awaiter(void 0, void 0, void 0, function* () { })),
        new async_runners_1.Runner(() => __awaiter(void 0, void 0, void 0, function* () {
            return yield sleep_1.sleep(1000);
        }), () => __awaiter(void 0, void 0, void 0, function* () { })),
        new async_runners_1.Runner(() => __awaiter(void 0, void 0, void 0, function* () {
            return yield sleep_1.sleep(1000);
        }), () => __awaiter(void 0, void 0, void 0, function* () { })),
        new async_runners_1.Runner(() => __awaiter(void 0, void 0, void 0, function* () {
            return yield sleep_1.sleep(1000);
        }), () => __awaiter(void 0, void 0, void 0, function* () { })),
    ];
    const timeStart = new Date().getTime();
    yield async_runners_1.runBatch(2, runners);
    const timeEnd = new Date().getTime();
    console.log(`time use: ${timeEnd - timeStart}`);
    expect(timeEnd - timeStart < 5000).toBe(true);
    // restore the status of all runners
    yield Promise.all(runners.map((runner) => runner.init()));
    // let the runner run at least 2 seconds
    async_runners_1.runBatch(2, runners).catch((err) => console.log(err));
    expect(yield (() => __awaiter(void 0, void 0, void 0, function* () {
        const timeStart = new Date().getTime();
        try {
            yield async_runners_1.getAvailableRunners(runners, 5, 1000);
            return true;
        }
        catch (e) {
            console.log(e);
            const timeEnd = new Date().getTime();
            console.log(`get available runners failed with in 1000ms, time used: ${timeEnd - timeStart}`);
            return false;
        }
    }))()).toBe(false);
    expect(yield (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const timeStart = new Date().getTime();
            yield async_runners_1.getAvailableRunners(runners, 2, 1000);
            const timeEnd = new Date().getTime();
            console.log(`get available runners time used: ${timeEnd - timeStart}, with in 1000ms`);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }))()).toBe(true);
}));
test('runBatch', () => {
    ;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const runners = stream_1.Stream.of(math_1.range(0, 10, 1))
            .map((i) => {
            return new async_runners_1.Runner(() => __awaiter(void 0, void 0, void 0, function* () {
                console.log(`i: `, i);
                yield sleep_1.sleep(10);
            }), () => __awaiter(void 0, void 0, void 0, function* () { }));
        })
            .collect();
        yield async_runners_1.runBatch(2, runners);
    }))().catch((err) => console.log(err));
});
test('AsyncRunner', () => __awaiter(void 0, void 0, void 0, function* () {
    const asyncRunner = new async_runners_1.AsyncRunner(3, []);
    const runner1 = () => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep_1.sleep(1000);
        return 1;
    });
    const runner2 = () => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep_1.sleep(2000);
        return 2;
    });
    const runner3 = () => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep_1.sleep(3000);
        return 3;
    });
    asyncRunner.add(runner1, runner2, runner3, runner1, runner3, runner2, runner3, runner1, runner2);
    const timeStart = new Date().getTime();
    asyncRunner.run().catch((err) => {
        throw err;
    });
    // wait runner1 and runner2 and runner3 run completed
    yield sleep_1.sleep(3500);
    yield asyncRunner.stop();
    console.log(asyncRunner.result);
    yield sleep_1.sleep(3000);
    console.log(asyncRunner.result);
    yield asyncRunner.stop();
    console.log(asyncRunner.result);
}), 10000);
