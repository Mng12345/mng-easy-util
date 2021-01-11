"use strict";
// fit curve by linear-regression which implemented by ga
// this code is under beta stage!! TODO
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
exports.fit = void 0;
var ga_1 = require("./ga");
var min_max_1 = require("../min-max");
var defaultFitFunc = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    if (params.length <= 1)
        throw new Error("the length of params must > 1");
    var kList = params.slice(0, params.length - 1);
    var b = params[params.length - 1];
    return function () {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
        var sum = 0;
        for (var i = 0; i < x.length; i++) {
            sum += x[i] * kList[i];
        }
        sum += b;
        return sum;
    };
};
var fit = function (_a) {
    var x = _a.x, y = _a.y, initValues = _a.initValues, _b = _a.fitFunc, fitFunc = _b === void 0 ? defaultFitFunc : _b, _c = _a.maxIterations, maxIterations = _c === void 0 ? 500 : _c, _d = _a.tolerance, tolerance = _d === void 0 ? 0.01 : _d;
    var Individual = /** @class */ (function (_super) {
        __extends(Individual, _super);
        function Individual() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Individual.prototype.calFitness = function () {
            var func = fitFunc.apply(void 0, __spread(this.data));
            var err = 0;
            for (var i = 0; i < x.length; i++) {
                var yPredictItem = func.apply(void 0, __spread(x[i]));
                err += Math.abs(y[i] - yPredictItem);
            }
            this.fitness = new min_max_1.ComparableNumber(err, tolerance);
            return this.fitness;
        };
        Individual.prototype.clone = function () {
            var data = __spread(this.data);
            var fitness = this.fitness && this.fitness.clone();
            return new Individual(data, fitness);
        };
        return Individual;
    }(ga_1.AbstractIndividual));
    var individualCross = function (i1, i2) {
        var newI1 = i1.clone();
        var newI2 = i2.clone();
        var crossedIndex = Math.floor(Math.random() * initValues.length);
        newI1.data[crossedIndex] = i2.data[crossedIndex];
        newI2.data[crossedIndex] = i1.data[crossedIndex];
        return [newI1, newI2];
    };
    var individualMutate = function (i) {
        var newI = i.clone();
        var mutatedIndex = Math.floor(Math.random() * initValues.length);
        var valueGap = newI.data[mutatedIndex] - initValues[mutatedIndex];
        if (Math.random() < 0.5) {
            // mutate down
            newI.data[mutatedIndex] -=
                Math.random() * (valueGap <= 0 ? -valueGap : valueGap) * 0.1;
        }
        else {
            // mutate up
            newI.data[mutatedIndex] +=
                Math.random() * (valueGap <= 0 ? -valueGap : valueGap) * 0.1;
        }
        return newI;
    };
    var individualInit = function () {
        var data = [];
        for (var i = 0; i < initValues.length; i++) {
            data.push(initValues[i] * Math.random());
        }
        return new Individual(data, undefined);
    };
    var ga = new ga_1.GA({
        individualCross: individualCross,
        individualMutate: individualMutate,
        individualInit: individualInit,
        maxGenerationToStop: 100,
        popSize: 1000,
        pMutate: 0.25,
        pCross: 0.9,
    });
    ga.generalSize = maxIterations;
    ga.initPops();
    var trace = ga.start();
    return {
        values: ga.bestIndividual.data,
        error: ga.bestIndividual.fitness.value,
        iterations: trace.length,
    };
};
exports.fit = fit;
