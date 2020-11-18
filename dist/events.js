"use strict";
// event communication between components
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
exports.Observer = void 0;
var Observer = /** @class */ (function () {
    function Observer() {
        this.handlers = {};
    }
    Observer.prototype.on = function (event, fn) {
        var handlers = this.handlers[event];
        if (handlers === undefined) {
            handlers = [];
        }
        handlers.push(fn);
        this.handlers[event] = handlers;
    };
    Observer.prototype.fire = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this.handlers[event];
        if (handlers !== undefined && handlers.length > 0) {
            handlers.forEach(function (handler) { return handler.apply(void 0, __spread(args)); });
        }
    };
    return Observer;
}());
exports.Observer = Observer;
