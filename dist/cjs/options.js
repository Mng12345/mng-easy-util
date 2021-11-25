"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
class Option {
    constructor(v) {
        this.value = null;
        this.value = v;
    }
    static of(v) {
        return new Option(v);
    }
    static empty() {
        return new Option(null);
    }
    expect(info) {
        if (this.value === null) {
            throw new Error(info);
        }
        else {
            return this.value;
        }
    }
    unwrap() {
        return this.expect(`the value is null`);
    }
    get() {
        return this.value;
    }
}
exports.Option = Option;
