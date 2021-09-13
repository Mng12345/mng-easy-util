"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("./json");
test('stringify', () => {
    const a = {
        x: 1,
        obj: undefined,
        y: null,
    };
    console.log(`a json: ${json_1.JSONUtil.stringify(a)}`);
    a.obj = a;
    try {
        const aJSON = JSON.stringify(a);
        console.log(`a json: ${aJSON}`);
    }
    catch (e) {
        expect(e !== undefined && e !== null).toBe(true);
    }
    try {
        const str = json_1.stringifyNoCircle(a);
        console.log(str);
    }
    catch (e) {
        throw e;
    }
});
test('JSONUtil', () => {
    const obj = {
        a: 1,
        f: function () {
            return 'f';
        },
        c: () => {
            return 'c';
        },
    };
    const objStr = json_1.JSONUtil.stringify(obj);
    console.log(objStr);
    const objValue = json_1.JSONUtil.parse(objStr);
    const fValue = objValue.f();
    const cValue = objValue.c();
    expect(fValue).toBe('f');
    expect(cValue).toBe('c');
});
