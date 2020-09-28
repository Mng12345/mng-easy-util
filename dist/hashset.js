"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashSet = void 0;
var hashmap_1 = require("./hashmap");
var HashSet = /** @class */ (function () {
    function HashSet() {
        this.hashCodeSet = new Set();
        this.hashCodeObjMap = new Map();
        this.size = this.hashCodeSet.size;
    }
    HashSet.prototype[Symbol.iterator] = function () {
        return this.hashCodeObjMap.values();
    };
    HashSet.prototype.entries = function () {
        var valueIterator = this.hashCodeObjMap.values();
        return new /** @class */ (function () {
            function class_1() {
            }
            class_1.prototype.next = function () {
                var value = valueIterator.next();
                return {
                    done: value.done,
                    value: [value.value, value.value]
                };
            };
            class_1.prototype[Symbol.iterator] = function () {
                return this;
            };
            return class_1;
        }());
    };
    HashSet.prototype.keys = function () {
        return this.hashCodeObjMap.values();
    };
    HashSet.prototype.values = function () {
        return this.hashCodeObjMap.values();
    };
    HashSet.prototype.hashCode = function (obj) {
        if (hashmap_1.isBasic(obj)) {
            return obj;
        }
        else {
            return obj.hashCode();
        }
    };
    HashSet.prototype.add = function (value) {
        var code = this.hashCode(value);
        this.hashCodeSet.add(code);
        this.hashCodeObjMap.set(code, value);
        this.size = this.hashCodeSet.size;
        return this;
    };
    HashSet.prototype.clear = function () {
        this.hashCodeSet.clear();
        this.hashCodeObjMap.clear();
        this.size = this.hashCodeSet.size;
    };
    HashSet.prototype.delete = function (value) {
        var code = this.hashCode(value);
        var flag = this.hashCodeSet.delete(code);
        this.hashCodeObjMap.delete(code);
        this.size = this.hashCodeSet.size;
        return flag;
    };
    HashSet.prototype.forEach = function (callbackfn, thisArg) {
        var _this = this;
        this.hashCodeObjMap.forEach(function (value, key, map) {
            callbackfn(value, value, _this);
        });
    };
    HashSet.prototype.has = function (value) {
        return this.hashCodeSet.has(this.hashCode(value));
    };
    return HashSet;
}());
exports.HashSet = HashSet;
