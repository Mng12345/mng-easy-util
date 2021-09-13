"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONUtil = exports.parse = exports.stringifyNoCircle = void 0;
const stringifyNoCircle = (obj) => {
    let cache = new WeakSet();
    const str = JSON.stringify(obj, (key, value) => {
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
            const fStr = value.toString();
            if (fStr.indexOf('function') === 0) {
                return value.toString();
            }
            else {
                return `function(...args) {
          const fStr = \`${fStr}\`
          const f = eval(\`(\${fStr})\`)
          return f(...args)
        }`;
            }
        }
        return value;
    });
    cache = null;
    return str;
};
exports.stringifyNoCircle = stringifyNoCircle;
const parse = (object) => {
    return JSON.parse(object, (key, v) => {
        if (typeof v === 'string' && v.indexOf('function') === 0) {
            return eval(`(${v})`);
        }
        return v;
    });
};
exports.parse = parse;
class JSONUtil {
}
exports.JSONUtil = JSONUtil;
JSONUtil.stringify = exports.stringifyNoCircle;
JSONUtil.parse = exports.parse;
