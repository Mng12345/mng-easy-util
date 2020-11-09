"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = require("./object");
test('mapObject', function () {
    var a = { a: 1, b: 2, c: 3 };
    var items = object_1.mapObject(a, function (key) { return ({ key: key, value: a[key] }); });
    console.log("items:", items);
    expect(items[0].value + items[1].value + items[2].value).toBe(6);
});
