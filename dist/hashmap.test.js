"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hashmap_1 = require("./hashmap");
var hashCode = function () {
    return "{a: " + this.a + ", b: " + this.b + "}";
};
test('new HashMap', function () {
    var map = new hashmap_1.HashMap();
    expect(map.size).toBe(0);
});
test('set & get', function () {
    var map = new hashmap_1.HashMap();
    map.set({ a: 1, b: 2, hashCode: hashCode }, 3);
    var v = map.get({ a: 1, b: 2, hashCode: hashCode });
    expect(v).toBe(3);
});
test('Symbol.iterator', function () {
    var e_1, _a;
    var map = new hashmap_1.HashMap();
    map.set(1, 2);
    try {
        for (var map_1 = __values(map), map_1_1 = map_1.next(); !map_1_1.done; map_1_1 = map_1.next()) {
            var _b = __read(map_1_1.value, 2), k = _b[0], v = _b[1];
            expect(k).toBe(1);
            expect(v).toBe(2);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (map_1_1 && !map_1_1.done && (_a = map_1.return)) _a.call(map_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
test('entries', function () {
    var e_2, _a;
    var map = new hashmap_1.HashMap();
    map.set(1, 2).set(2, 3);
    var keySum = 0;
    var valSum = 0;
    try {
        for (var _b = __values(map.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
            keySum += k;
            valSum += v;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    expect(keySum).toBe(3);
    expect(valSum).toBe(5);
});
test('keys & values', function () {
    var e_3, _a, e_4, _b;
    var map = new hashmap_1.HashMap();
    map.set(1, 2);
    try {
        for (var _c = __values(map.keys()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var k = _d.value;
            expect(k).toBe(1);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_3) throw e_3.error; }
    }
    try {
        for (var _e = __values(map.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
            var v = _f.value;
            expect(v).toBe(2);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_4) throw e_4.error; }
    }
});
test('size', function () {
    var map = new hashmap_1.HashMap();
    map.set(1, 2);
    expect(map.size).toBe(1);
});
test('clear', function () {
    var map = new hashmap_1.HashMap();
    map.set(1, 2);
    expect(map.size).toBe(1);
    map.clear();
    expect(map.size).toBe(0);
});
test('delete', function () {
    var map = new hashmap_1.HashMap();
    map.set(1, 2);
    expect(map.size).toBe(1);
    map.delete(1);
    expect(map.size).toBe(0);
    map.set({ a: 1, b: 2, hashCode: hashCode }, 3);
    expect(map.size).toBe(1);
    map.delete({ a: 1, b: 2, hashCode: hashCode });
    expect(map.size).toBe(0);
});
test('forEach', function () {
    var map = new hashmap_1.HashMap();
    map.set(1, 2);
    map.set(2, 3);
    map.forEach(function (value, key, map) {
        expect(value === 2 || value === 3).toBe(true);
        expect(key === 1 || key === 2).toBe(true);
    });
});
test('has', function () {
    var map = new hashmap_1.HashMap();
    map.set(1, 2);
    map.set({ a: 1, b: 2, hashCode: hashCode }, 3);
    expect(map.has(1)).toBe(true);
    expect(map.has({ a: 1, b: 2, hashCode: hashCode })).toBe(true);
});
