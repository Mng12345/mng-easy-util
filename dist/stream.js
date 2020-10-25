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
exports.Stream = void 0;
function isArrayLike(data) {
    return data.length && data[0];
}
var Stream = /** @class */ (function () {
    function Stream(data) {
        if (isArrayLike(data)) {
            var index_1 = 0;
            this.iterator = new /** @class */ (function () {
                function class_1() {
                }
                class_1.prototype.next = function () {
                    var value = data[index_1];
                    if (index_1 < data.length) {
                        index_1++;
                        return {
                            done: false,
                            value: value
                        };
                    }
                    else {
                        return {
                            done: true,
                            value: value
                        };
                    }
                };
                class_1.prototype[Symbol.iterator] = function () {
                    return this;
                };
                return class_1;
            }());
        }
        else {
            this.iterator = data;
        }
    }
    Stream.of = function (data) {
        return new Stream(data);
    };
    Stream.prototype.each = function (callback) {
        var e_1, _a;
        var index = 0;
        try {
            for (var _b = __values(this.iterator), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                callback(item, index++);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Stream.prototype.map = function (callback) {
        var index = 0;
        var outThis = this;
        var itor = new /** @class */ (function () {
            function class_2() {
            }
            class_2.prototype[Symbol.iterator] = function () {
                return this;
            };
            class_2.prototype.next = function () {
                var value = outThis.iterator.next();
                var res = undefined;
                if (!value.done) {
                    res = callback(value.value, index++);
                }
                return {
                    done: value.done,
                    value: res
                };
            };
            return class_2;
        }());
        return new Stream(itor);
    };
    Stream.prototype.filter = function (callback) {
        var index = 0;
        var outThis = this;
        var itor = new /** @class */ (function () {
            function class_3() {
            }
            class_3.prototype[Symbol.iterator] = function () {
                return this;
            };
            class_3.prototype.next = function () {
                var valueFiltered;
                while (true) {
                    var value = outThis.iterator.next();
                    valueFiltered = value;
                    if (value.done) {
                        // iterator done
                        valueFiltered = value;
                        break;
                    }
                    else {
                        // check filter
                        if (callback(value.value, index++)) {
                            valueFiltered = value;
                            break;
                        }
                    }
                }
                return valueFiltered;
            };
            return class_3;
        }());
        return new Stream(itor);
    };
    Stream.prototype.collect = function () {
        var e_2, _a;
        var res = [];
        try {
            for (var _b = __values(this.iterator), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                res.push(item);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return res;
    };
    return Stream;
}());
exports.Stream = Stream;
