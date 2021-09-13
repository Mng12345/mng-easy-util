"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pointer_1 = require("./pointer");
test('of & get & assign', () => {
    const value = 1;
    const pointer = pointer_1.Pointer.of(value);
    const f = (pointer) => {
        pointer.assign(2);
    };
    f(pointer);
    const newValue = pointer.get();
    expect(newValue).toBe(2);
});
test('empty & get & assign', () => {
    const pointer = pointer_1.Pointer.empty();
    pointer.assign(3);
    const value = pointer.get();
    expect(value).toBe(3);
});
