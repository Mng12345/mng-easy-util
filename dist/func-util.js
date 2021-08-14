"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFunc = exports.FuncClassTrace = void 0;
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
var copyFunc = function (func) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        func.apply(void 0, __spread(args));
    };
};
exports.copyFunc = copyFunc;
