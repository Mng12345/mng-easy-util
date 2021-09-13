"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFunc = exports.FuncClassTrace = void 0;
const hashmap_1 = require("./hashmap");
/**
 * utils for limiting func call once, call func called count
 */
class FuncClassTrace {
    static getCalledCount(name) {
        if (!FuncClassTrace.trace.has(name)) {
            return 0;
        }
        return FuncClassTrace.trace.get(name);
    }
    static doOneTime(func, name) {
        if (FuncClassTrace.trace.has(name)) {
            return;
        }
        else {
            func();
            FuncClassTrace.trace.set(name, 1);
        }
    }
    static clear(name) {
        if (name) {
            FuncClassTrace.trace.delete(name);
        }
        else {
            FuncClassTrace.trace.clear();
        }
    }
    static callCount(func, name) {
        func();
        if (FuncClassTrace.trace.has(name)) {
            FuncClassTrace.trace.set(name, FuncClassTrace.trace.get(name) + 1);
        }
        else {
            FuncClassTrace.trace.set(name, 1);
        }
    }
}
exports.FuncClassTrace = FuncClassTrace;
FuncClassTrace.trace = new hashmap_1.HashMap();
const copyFunc = (func) => {
    return (...args) => {
        func(...args);
    };
};
exports.copyFunc = copyFunc;
