import {Pointer} from "./pointer";

test('of & get & assign', () => {
    const value = 1;
    const pointer = Pointer.of(value);
    const f = (pointer: Pointer<number>) => {
        pointer.assign(2);
    };
    f(pointer);
    const newValue = pointer.get();
    expect(newValue).toBe(2);
});

test('empty & get & assign', () => {
    const pointer = Pointer.empty<number>();
    pointer.assign(3);
    const value = pointer.get();
    expect(value).toBe(3);
});
