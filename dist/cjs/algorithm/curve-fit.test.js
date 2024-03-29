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
const curve_fit_1 = require("./curve-fit");
const math = __importStar(require("../math"));
test('linear curve fit', () => {
    const x = [1, 2, 3, 4, 5];
    const fitFunc = (k, b) => {
        return (x) => k * x + b;
    };
    const y = x.map((item) => fitFunc(2, 1)(item));
    const params = curve_fit_1.curveFit({
        x,
        y,
        minValues: [-1, -1],
        maxValues: [4, 4],
        fitFunc,
        maxIterations: 500,
        tolerance: 0.2,
    });
    const yPredict = x.map((item) => params.func(item));
    console.log(`y: ${JSON.stringify(y)}\npredict: ${JSON.stringify(yPredict)}\nparams: ${JSON.stringify(params)}`);
    expect(math.isCloseable(params.values[0], 2, 0.1) &&
        math.isCloseable(params.values[1], 1, 0.1)).toBe(true);
});
