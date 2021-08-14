"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionaryStream = exports.Stream = void 0;
function isArrayLike(data) {
    return data.length;
}
var Stream = /** @class */ (function () {
    function Stream(data) {
        if (isArrayLike(data)) {
            var index_1 = 0;
            this.iterator = new (/** @class */ (function () {
                function class_1() {
                }
                class_1.prototype.next = function () {
                    var value = data[index_1];
                    if (index_1 < data.length) {
                        index_1++;
                        return {
                            done: false,
                            value: value,
                        };
                    }
                    else {
                        return {
                            done: true,
                            value: value,
                        };
                    }
                };
                class_1.prototype[Symbol.iterator] = function () {
                    return this;
                };
                return class_1;
            }()))();
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
    Stream.prototype.forEach = function (callback) {
        this.each(callback);
    };
    Stream.prototype.map = function (callback) {
        var index = 0;
        var outThis = this;
        var itor = new (/** @class */ (function () {
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
                    value: res,
                };
            };
            return class_2;
        }()))();
        return new Stream(itor);
    };
    Stream.prototype.flatMap = function (callback) {
        var index = 0;
        var outThis = this;
        var currentValue = { done: false, value: [] };
        var iterator = new (/** @class */ (function () {
            function class_3() {
            }
            class_3.prototype[Symbol.iterator] = function () {
                return this;
            };
            class_3.prototype.next = function () {
                if (currentValue.value.length > 0) { // already read a value from the result which is parsed from out iterator and the left result.length > 1
                    var value = currentValue.value.shift();
                    return {
                        done: false,
                        value: value
                    };
                }
                else {
                    var value = outThis.iterator.next(); // second branch read a value from out iterator
                    if (value.done) { // the out iterator is empty
                        return {
                            done: true,
                            value: undefined
                        };
                    }
                    // get result from out iterator
                    currentValue = {
                        value: __spread(callback(value.value, index++)),
                        done: value.done,
                    };
                    if (currentValue.value.length === 0) { // current result from out iterator is [], go to the second branch again
                        return {
                            done: false,
                            value: undefined
                        };
                    }
                    else { // current result.length > 1, shift one element, go to the first branch
                        return {
                            done: false,
                            value: currentValue.value.shift()
                        };
                    }
                }
            };
            return class_3;
        }()))();
        // genius work!
        return new Stream(iterator).filter(function (item) { return item !== undefined; });
    };
    Stream.prototype.filter = function (callback) {
        var index = 0;
        var outThis = this;
        var itor = new (/** @class */ (function () {
            function class_4() {
            }
            class_4.prototype[Symbol.iterator] = function () {
                return this;
            };
            class_4.prototype.next = function () {
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
            return class_4;
        }()))();
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
    Stream.prototype.groupBy = function (callback) {
        var result = {};
        var keys = [];
        this.each(function (item, index) {
            var key = callback(item, index);
            var value = result[key];
            if (value) {
                value.push(item);
            }
            else {
                result[key] = [item];
                keys.push(key);
            }
        });
        return new DictionaryStream(Stream.of(keys).map(function (key) {
            var value = [key, result[key]];
            return value;
        }));
    };
    return Stream;
}());
exports.Stream = Stream;
var DictionaryStream = /** @class */ (function (_super) {
    __extends(DictionaryStream, _super);
    function DictionaryStream(stream) {
        return _super.call(this, stream.iterator) || this;
    }
    DictionaryStream.prototype.toDict = function () {
        var result = {};
        this.each(function (item) {
            result[item[0]] = item[1];
        });
        return result;
    };
    return DictionaryStream;
}(Stream));
exports.DictionaryStream = DictionaryStream;
