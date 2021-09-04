"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_1 = require("./json");
test('stringify', function () {
    var a = {
        x: 1,
        obj: undefined,
        y: null,
    };
    console.log("a json: " + json_1.JSONUtil.stringify(a));
    a.obj = a;
    try {
        var aJSON = JSON.stringify(a);
        console.log("a json: " + aJSON);
    }
    catch (e) {
        expect(e !== undefined && e !== null).toBe(true);
    }
    try {
        var str = json_1.stringifyNoCircle(a);
        console.log(str);
    }
    catch (e) {
        throw e;
    }
});
test('JSONUtil', function () {
    var obj = {
        a: 1,
        f: function () {
            return 'f';
        },
        c: function () {
            return 'c';
        },
    };
    var objStr = json_1.JSONUtil.stringify(obj);
    console.log(objStr);
    var objValue = json_1.JSONUtil.parse(objStr);
    var fValue = objValue.f();
    var cValue = objValue.c();
    expect(fValue).toBe('f');
    expect(cValue).toBe('c');
});
