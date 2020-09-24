"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashMap = void 0;
var HashMap = /** @class */ (function () {
    function HashMap(config) {
        this.map = new Map();
        // store key and hashcode
        this.keyMap = new Map();
        this.hashCode = function (object) {
            if (typeof object === "number" || typeof object === "string") {
                return object;
            }
            // todo need to develop better function for making the key to string
            return JSON.stringify(object);
        };
        if (config !== undefined && config.hashCode && typeof config.hashCode === "function") {
            this.hashCode = config.hashCode;
        }
        this.size = this.map.size;
    }
    HashMap.prototype[Symbol.iterator] = function () {
        return this.entries();
    };
    HashMap.prototype.entries = function () {
        var keyIterator = this.keys();
        var valueIterator = this.values();
        return new /** @class */ (function () {
            function class_1() {
            }
            class_1.prototype.next = function () {
                return {
                    done: true,
                    value: [keyIterator.next(), valueIterator.next()]
                };
            };
            class_1.prototype[Symbol.iterator] = function () {
                return this;
            };
            return class_1;
        }());
    };
    HashMap.prototype.keys = function () {
        return this.keyMap.values();
    };
    HashMap.prototype.values = function () {
        return this.map.values();
    };
    HashMap.prototype.clear = function () {
        this.map.clear();
        this.size = this.map.size;
    };
    HashMap.prototype.delete = function (key) {
        var hashCode = this.hashCode(key);
        this.keyMap.delete(hashCode);
        var deleteFlag = this.map.delete(this.hashCode(key));
        this.size = this.map.size;
        return deleteFlag;
    };
    HashMap.prototype.forEach = function (callbackfn, thisArg) {
        var _this = this;
        this.map.forEach(function (value1, key1, map1) {
            // get key
            var originalKey = _this.keyMap.get(key1);
            if (typeof originalKey === undefined) {
                throw new Error("can not find key " + key1 + " in HashMap's map");
            }
            callbackfn(value1, originalKey, _this);
        });
    };
    HashMap.prototype.get = function (key) {
        return this.map.get(this.hashCode(key));
    };
    HashMap.prototype.has = function (key) {
        var hashCode = this.hashCode(key);
        return this.keyMap.has(hashCode);
    };
    HashMap.prototype.set = function (key, value) {
        var hashCode = this.hashCode(key);
        this.keyMap.set(hashCode, key);
        this.map.set(hashCode, value);
        this.size = this.map.size;
        return this;
    };
    return HashMap;
}());
exports.HashMap = HashMap;
