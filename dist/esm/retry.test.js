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
import { retry } from './retry';
test('retry1', () => __awaiter(void 0, void 0, void 0, function* () {
    const f1 = () => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(500);
        return 1;
    });
    const fRetry1 = retry({
        func: f1,
        times: 3,
        errCb: (e) => console.log(e),
        isAsync: true,
    });
    const res1 = yield fRetry1();
    expect(res1).toBe(1);
    const f2 = () => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(500);
        throw `err`;
    });
    const fRetry2 = retry({
        func: f2,
        times: 3,
        errCb: (e) => console.log(`retrying...`),
        isAsync: true,
    });
    try {
        const res2 = yield fRetry2();
    }
    catch (e) {
        console.log(e);
    }
    const f3 = (a) => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(500);
        return a + 1;
    });
    const fRetry3 = retry({
        func: f3,
        times: 3,
        errCb: (e) => console.log(e),
        isAsync: true,
    });
    const res3 = yield fRetry3(3);
    expect(res3).toBe(4);
}), 3000);
test('retry2', () => {
    const f1 = () => {
        return 1;
    };
    const fRetry1 = retry({
        func: f1,
        times: 3,
        errCb: (e) => console.log(e),
    });
    const res1 = fRetry1();
    expect(res1).toBe(1);
    const f2 = () => {
        throw `err`;
    };
    const fRetry2 = retry({
        func: f2,
        times: 3,
        errCb: (e) => console.log(`retrying...`),
    });
    try {
        const res2 = fRetry2();
    }
    catch (e) {
        console.log(e);
    }
    const f3 = (a) => {
        return a + 1;
    };
    const fRetry3 = retry({
        func: f3,
        times: 3,
        errCb: (e) => console.log(e),
    });
    const res3 = fRetry3(3);
    expect(res3).toBe(4);
}, 3000);
