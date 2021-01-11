"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObject = void 0;
var mapObject = function (obj, extractor) {
    var keys = Object.keys(obj);
    return keys.map(extractor);
};
exports.mapObject = mapObject;
