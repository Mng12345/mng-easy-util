"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObject = void 0;
const mapObject = (obj, extractor) => {
    const keys = Object.keys(obj);
    return keys.map(extractor);
};
exports.mapObject = mapObject;
