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
Object.defineProperty(exports, "__esModule", { value: true });
var hashset_1 = require("./hashset");
var stream_1 = require("./stream");
test('entries', function () {
    var set = new hashset_1.HashSet();
    set.add(1).add(2);
    expect((function () {
        var e_1, _a;
        var sum = 0;
        try {
            for (var set_1 = __values(set), set_1_1 = set_1.next(); !set_1_1.done; set_1_1 = set_1.next()) {
                var item = set_1_1.value;
                sum += item;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (set_1_1 && !set_1_1.done && (_a = set_1.return)) _a.call(set_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return sum;
    })()).toBe(3);
});
var hashCode = function (key) {
    return "a: " + key.a + ", b: " + key.b;
};
var Key = /** @class */ (function () {
    function Key(a, b) {
        this.a = a;
        this.b = b;
    }
    Key.prototype.hashCode = function () {
        return "a: " + this.a + ", b: " + this.b;
    };
    return Key;
}());
test('keys & values', function () {
    var set = new hashset_1.HashSet();
    set.add(1).add(2);
    expect((function () {
        var e_2, _a;
        var sum = 0;
        try {
            for (var set_2 = __values(set), set_2_1 = set_2.next(); !set_2_1.done; set_2_1 = set_2.next()) {
                var item = set_2_1.value;
                sum += item;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (set_2_1 && !set_2_1.done && (_a = set_2.return)) _a.call(set_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return sum;
    })()).toBe(3);
    var objSet = new hashset_1.HashSet();
    objSet.add(new Key(1, 2)).add(new Key(3, 4));
    expect(stream_1.Stream.of(objSet.keys()).collect()[0].hashCode()).toBe(new Key(1, 2).hashCode());
});
