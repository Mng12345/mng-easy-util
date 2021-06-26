"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
var Option = /** @class */ (function () {
    function Option(value) {
        this.value = value;
    }
    Option.prototype.hasValue = function () {
        return this.value !== undefined && this.value !== null;
    };
    return Option;
}());
exports.Option = Option;
