"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
test('mapObject', () => {
    const a = { a: 1, b: 2, c: 3 };
    const items = object_1.mapObject(a, (key) => ({ key, value: a[key] }));
    console.log(`items:`, items);
    expect(items[0].value + items[1].value + items[2].value).toBe(6);
});
