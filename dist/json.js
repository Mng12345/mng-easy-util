"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyNoCircle = void 0;
var stringifyNoCircle = function (obj) {
    var cache = new WeakSet();
    var str = JSON.stringify(obj, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                return;
            }
            cache.add(value);
        }
        return value;
    });
    cache = null;
    return str;
};
exports.stringifyNoCircle = stringifyNoCircle;
