"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncClassTrace = void 0;
var hashmap_1 = require("./hashmap");
/**
 * utils for limiting func call once, call func called count
 */
var FuncClassTrace = /** @class */ (function () {
    function FuncClassTrace() {
    }
    FuncClassTrace.getCalledCount = function (name) {
        if (!FuncClassTrace.trace.has(name)) {
            return 0;
        }
        return FuncClassTrace.trace.get(name);
    };
    FuncClassTrace.doOneTime = function (func, name) {
        if (FuncClassTrace.trace.has(name)) {
            return;
        }
        else {
            func();
            FuncClassTrace.trace.set(name, 1);
        }
    };
    FuncClassTrace.clear = function (name) {
        if (name) {
            FuncClassTrace.trace.delete(name);
        }
        else {
            FuncClassTrace.trace.clear();
        }
    };
    FuncClassTrace.callCount = function (func, name) {
        func();
        if (FuncClassTrace.trace.has(name)) {
            FuncClassTrace.trace.set(name, FuncClassTrace.trace.get(name) + 1);
        }
        else {
            FuncClassTrace.trace.set(name, 1);
        }
    };
    FuncClassTrace.trace = new hashmap_1.HashMap();
    return FuncClassTrace;
}());
exports.FuncClassTrace = FuncClassTrace;
