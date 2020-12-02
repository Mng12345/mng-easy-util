"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache_lru_1 = require("./cache.lru");
test('constructor & put & get', function () {
    var lru = new cache_lru_1.Lru(4, function (key) { return key + ''; });
    lru.put(1, 1);
    lru.put(2, 2);
    lru.put(3, 3);
    lru.put(4, 4);
    console.log("values:", lru.headNode.toArray().map(function (item) { return item.value; }));
    var v2 = lru.get(2);
    expect(v2).toBe(2);
    console.log("values:", lru.headNode.toArray().map(function (item) { return item.value; }));
    expect(lru.tailNode.value.value).toBe(2);
    lru.put(5, 5);
    console.log("values:", lru.headNode.toArray().map(function (item) { return item.value; }));
    expect(lru.headNode.value.value).toBe(3);
});
