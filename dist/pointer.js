"use strict";
// pointer address of var
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pointer = void 0;
var Pointer = /** @class */ (function () {
    function Pointer() {
        this.valueContainer = [];
    }
    Pointer.of = function (value) {
        var pointer = new Pointer();
        pointer.valueContainer[0] = value;
        return pointer;
    };
    Pointer.empty = function () {
        return new Pointer();
    };
    Pointer.prototype.get = function () {
        return this.valueContainer[0];
    };
    Pointer.prototype.assign = function (value) {
        this.valueContainer[0] = value;
    };
    return Pointer;
}());
exports.Pointer = Pointer;
