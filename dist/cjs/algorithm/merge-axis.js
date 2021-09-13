"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
// merge multiply [[x1, y1], [x2, y2], ...] line into [x, y1, y2, y3, ...]
const lodash_1 = __importDefault(require("lodash"));
const stream_1 = require("../stream");
function isSingleMergeStringInput(lines) {
    let flag = true;
    for (const line of lines) {
        if (!(line.length &&
            line.length === 2 &&
            line[0].length &&
            line[0].length >= 1 &&
            typeof line[0][0] === 'string')) {
            flag = false;
            break;
        }
    }
    return flag;
}
function isSingleMergeNumberInput(lines) {
    let flag = true;
    for (const line of lines) {
        if (!(line.length &&
            line.length === 2 &&
            line[0].length &&
            line[0].length >= 1 &&
            typeof line[0][0] === 'number')) {
            flag = false;
            break;
        }
    }
    return flag;
}
function merge(...lines) {
    if (isSingleMergeNumberInput(lines)) {
        const xLines = lodash_1.default.map(lines, (line) => line[0]);
        const yLines = lines.map((line) => line[1]);
        const xItems = lodash_1.default.flatten(xLines);
        const xItemUnique = stream_1.Stream.of(new Set(xItems).keys()).collect().sort();
        const res = [xItemUnique];
        for (let i = 0; i < xLines.length; i++) {
            const xLine = xLines[i];
            const yLine = yLines[i];
            if (xLine.length !== yLine.length) {
                throw new Error(`the length of xLine must equals to yLine.`);
            }
            const newYLine = [];
            for (let j = 0; j < xItemUnique.length; j++) {
                let yItem = undefined;
                for (let k = 0; k < xLine.length; k++) {
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
        const xLines = lodash_1.default.map(lines, (line) => line[0]);
        const yLines = lines.map((line) => line[1]);
        const xItems = lodash_1.default.flatten(xLines);
        const xItemUnique = stream_1.Stream.of(new Set(xItems).keys()).collect().sort();
        const res = [xItemUnique];
        for (let i = 0; i < xLines.length; i++) {
            const xLine = xLines[i];
            const yLine = yLines[i];
            if (xLine.length !== yLine.length) {
                throw new Error(`the length of xLine must equals to yLine.`);
            }
            const newYLine = [];
            for (let j = 0; j < xItemUnique.length; j++) {
                let yItem = undefined;
                for (let k = 0; k < xLine.length; k++) {
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
        throw new Error(`type of lines must be SingleMergeStringInput or SingleMergeNumberInput.`);
    }
}
exports.merge = merge;
