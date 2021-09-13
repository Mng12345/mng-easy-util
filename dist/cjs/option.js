"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
class Option {
    constructor(value) {
        this.value = value;
    }
    hasValue() {
        return this.value !== undefined && this.value !== null;
    }
}
exports.Option = Option;
