var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sleep } from './file';
import { promisify, withTimeout } from './promise';
test('withTimeout', () => __awaiter(void 0, void 0, void 0, function* () {
    const makePromise = () => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(5000);
        return 1;
    });
    const promiseWithTimeout = withTimeout(makePromise(), 6000);
    try {
        const num = yield promiseWithTimeout;
        console.log(`promise returned:`, num);
    }
    catch (e) {
        console.log(e);
    }
}), 10000);
test('promise', () => __awaiter(void 0, void 0, void 0, function* () {
    const f1 = () => 1;
    const f2 = () => Promise.resolve(1);
    const f3 = () => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(1000);
        return 1;
    });
    const pf1 = promisify(f1);
    const pf2 = promisify(f2);
    const pf3 = promisify(f3);
    const r1 = yield pf1();
    const r2 = yield pf2();
    const r3 = yield pf3();
    expect(r1).toBe(1);
    expect(r2).toBe(1);
    expect(r3).toBe(1);
}), 3000);
