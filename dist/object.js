"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObject = void 0;
exports.mapObject = function (obj, extractor) {
    var keys = Object.keys(obj);
    return keys.map(extractor);
};
