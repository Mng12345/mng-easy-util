"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const co_1 = require("./co");
const sleep_1 = require("./sleep");
test('AsyncPool', () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = new co_1.AsyncPool(3);
    console.time();
    pool.push(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep_1.sleep(300);
        return 1;
    }), 'task-1');
    pool.push(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep_1.sleep(800);
        return 2;
    }), 'task-2');
    pool.push(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep_1.sleep(400);
        return 3;
    }), 'task-3');
    pool.push(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep_1.sleep(300);
        return 4;
    }), 'task-4');
    pool.push(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep_1.sleep(12000);
        throw 'error';
    }), 'task-5');
    yield pool.wait();
    console.timeEnd();
    console.log(`result:`, pool.resultMap);
}), 28000);
