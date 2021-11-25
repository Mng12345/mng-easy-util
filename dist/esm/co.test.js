// test for co
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AsyncPool } from './co';
import { sleep } from './sleep';
test('AsyncPool', () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = new AsyncPool(3);
    console.time();
    pool.push(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(300);
        return 1;
    }), 'task-1');
    pool.push(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(800);
        return 2;
    }), 'task-2');
    pool.push(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(400);
        return 3;
    }), 'task-3');
    pool.push(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(300);
        return 4;
    }), 'task-4');
    pool.push(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(12000);
        throw 'error';
    }), 'task-5');
    yield pool.wait();
    console.timeEnd();
    console.log(`result:`, pool.resultMap);
}), 28000);
