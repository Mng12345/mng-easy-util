"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONUtil = exports.parse = exports.stringifyNoCircle = void 0;
var stringifyNoCircle = function (obj) {
    var cache = new WeakSet();
    var str = JSON.stringify(obj, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                return;
            }
            cache.add(value);
            return value;
        }
        else if (typeof value === 'function') {
            if (cache.has(value)) {
                return;
            }
            cache.add(value);
            var fStr = value.toString();
            if (fStr.indexOf('function') === 0) {
                return value.toString();
            }
            else {
                return "function(...args) {\n          const fStr = `" + fStr + "`\n          const f = eval(`(${fStr})`)\n          return f(...args)\n        }";
            }
        }
        return value;
    });
    cache = null;
    return str;
};
exports.stringifyNoCircle = stringifyNoCircle;
var parse = function (object) {
    return JSON.parse(object, function (key, v) {
        if (typeof v === 'string' && v.indexOf('function') === 0) {
            return eval("(" + v + ")");
        }
        return v;
    });
};
exports.parse = parse;
var JSONUtil = /** @class */ (function () {
    function JSONUtil() {
    }
    JSONUtil.stringify = exports.stringifyNoCircle;
    JSONUtil.parse = exports.parse;
    return JSONUtil;
}());
exports.JSONUtil = JSONUtil;
