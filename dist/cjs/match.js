"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
function match(value, cases) {
    for (const [validate, map] of cases) {
        if (validate(value)) {
            return map(value);
        }
    }
    throw new Error(`unknown case of value[${value}]`);
}
exports.match = match;
