"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./math");
const math = __importStar(require("./math"));
test('ema', () => {
    const data = [5.1, 5.2, 5.0, 4.9, 5.3, 5.5, 4.8];
    const emaData = math_1.ema(data, 4);
    expect(Math.abs(data[data.length - 1] - emaData[emaData.length - 1]) < 2).toBe(true);
});
test('variance & std', () => {
    const a1 = [1, 1, 1];
    const a2 = [1, 0, 1];
    expect(math_1.variance(a1)).toBe(0);
    expect(Math.abs(math_1.variance(a2) - 1 / 3) <= 0.01).toBe(true);
    expect(math_1.std(a1)).toBe(0);
    expect(Math.abs(math_1.std(a2) - Math.sqrt(1 / 3)) <= 0.01).toBe(true);
});
test('r2', () => {
    const a1 = [1, 0, 1];
    const a2 = [1, 0, 1];
    const a3 = [1, 1, 0];
    expect(math_1.r2(a1, a2)).toBe(1);
    const r2a13 = math_1.r2(a1, a3);
    expect(r2a13 <= 1).toBe(true);
});
test('toBNumber', () => {
    console.log(math_1.toBNumber(12, 4));
    console.log(math_1.toBNumber(12, 8));
    // console.log(toBNumber(12, 2))
});
test('convertColorToHexNumberArray', () => {
    const array1 = math.convertColorToHexNumberArray(0x00ff12);
    expect(array1[0]).toBe(0);
    expect(array1[2]).toBe(15);
    expect(array1[5]).toBe(2);
});
test('convertColorToHexCharArray', () => {
    const array1 = math.convertColorToHexCharArray(0x00ff12);
    expect(array1[0]).toBe('0');
    expect(array1[2]).toBe('f');
    expect(array1[5]).toBe('2');
});
test('parseHexColorToNumber', () => {
    const value = math.parseHexColorToNumber('0x00ff12');
    expect(value).toBe(0x00ff12);
});
test('ma', () => {
    const data = [1, 2, 3, 4, 5];
    const n = 3;
    const ma = math.ma(data, 3);
    expect(ma[0]).toBe(math.sum([1, 2, 3]) / n);
    expect(ma[1]).toBe(math.sum([2, 3, 4]) / n);
    expect(ma[2]).toBe(math.sum([3, 4, 5]) / n);
    expect(ma.length).toBe(3);
});
