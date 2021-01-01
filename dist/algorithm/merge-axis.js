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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
// merge multiply [[x1, y1], [x2, y2], ...] line into [x, y1, y2, y3, ...]
var lodash_1 = __importDefault(require("lodash"));
var stream_1 = require("../stream");
function isSingleMergeStringInput(lines) {
    var e_1, _a;
    var flag = true;
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            if (!(line.length &&
                line.length === 2 &&
                line[0].length &&
                line[0].length >= 1 &&
                typeof line[0][0] === 'string')) {
                flag = false;
                break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return flag;
}
function isSingleMergeNumberInput(lines) {
    var e_2, _a;
    var flag = true;
    try {
        for (var lines_2 = __values(lines), lines_2_1 = lines_2.next(); !lines_2_1.done; lines_2_1 = lines_2.next()) {
            var line = lines_2_1.value;
            if (!(line.length &&
                line.length === 2 &&
                line[0].length &&
                line[0].length >= 1 &&
                typeof line[0][0] === 'number')) {
                flag = false;
                break;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (lines_2_1 && !lines_2_1.done && (_a = lines_2.return)) _a.call(lines_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return flag;
}
function merge() {
    var lines = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lines[_i] = arguments[_i];
    }
    if (isSingleMergeNumberInput(lines)) {
        var xLines = lodash_1.default.map(lines, function (line) { return line[0]; });
        var yLines = lines.map(function (line) { return line[1]; });
        var xItems = lodash_1.default.flatten(xLines);
        var xItemUnique = stream_1.Stream.of(new Set(xItems).keys()).collect().sort();
        var res = [xItemUnique];
        for (var i = 0; i < xLines.length; i++) {
            var xLine = xLines[i];
            var yLine = yLines[i];
            if (xLine.length !== yLine.length) {
                throw new Error("the length of xLine must equals to yLine.");
            }
            var newYLine = [];
            for (var j = 0; j < xItemUnique.length; j++) {
                var yItem = undefined;
                for (var k = 0; k < xLine.length; k++) {
                    if (xLine[k] === xItemUnique[j]) {
                        yItem = yLine[k];
                        break;
                    }
                }
                newYLine.push(yItem);
            }
            res.push(newYLine);
        }
        return res;
    }
    else if (isSingleMergeStringInput(lines)) {
        var xLines = lodash_1.default.map(lines, function (line) { return line[0]; });
        var yLines = lines.map(function (line) { return line[1]; });
        var xItems = lodash_1.default.flatten(xLines);
        var xItemUnique = stream_1.Stream.of(new Set(xItems).keys()).collect().sort();
        var res = [xItemUnique];
        for (var i = 0; i < xLines.length; i++) {
            var xLine = xLines[i];
            var yLine = yLines[i];
            if (xLine.length !== yLine.length) {
                throw new Error("the length of xLine must equals to yLine.");
            }
            var newYLine = [];
            for (var j = 0; j < xItemUnique.length; j++) {
                var yItem = undefined;
                for (var k = 0; k < xLine.length; k++) {
                    if (xLine[k] === xItemUnique[j]) {
                        yItem = yLine[k];
                        break;
                    }
                }
                newYLine.push(yItem);
            }
            res.push(newYLine);
        }
        return res;
    }
    else {
        throw new Error("type of lines must be SingleMergeStringInput or SingleMergeNumberInput.");
    }
}
exports.merge = merge;
