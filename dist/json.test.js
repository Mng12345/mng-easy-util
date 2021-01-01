"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_1 = require("./json");
test('stringify', function () {
    var a = {
        x: 1,
        obj: undefined,
    };
    a.obj = a;
    try {
        JSON.stringify(a);
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
