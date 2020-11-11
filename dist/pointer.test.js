"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pointer_1 = require("./pointer");
test('of & get & assign', function () {
    var value = 1;
    var pointer = pointer_1.Pointer.of(value);
    var f = function (pointer) {
        pointer.assign(2);
    };
    f(pointer);
    var newValue = pointer.get();
    expect(newValue).toBe(2);
});
test('empty & get & assign', function () {
    var pointer = pointer_1.Pointer.empty();
    pointer.assign(3);
    var value = pointer.get();
    expect(value).toBe(3);
});
