"use strict";
// fit the curve by GA algorithm
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
exports.curveFit = void 0;
var ga_1 = require("./ga");
var min_max_1 = require("../min-max");
exports.curveFit = function (_a) {
    var x = _a.x, y = _a.y, minValues = _a.minValues, maxValues = _a.maxValues, _b = _a.maxIterations, maxIterations = _b === void 0 ? 100 : _b, _c = _a.tolerance, tolerance = _c === void 0 ? 0.001 : _c, fitFunc = _a.fitFunc;
    var Individual = /** @class */ (function (_super) {
        __extends(Individual, _super);
        function Individual() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Individual.prototype.calFitness = function () {
            var func = fitFunc.apply(void 0, __spread(this.data));
            var err = 0;
            for (var i = 0; i < x.length; i++) {
                var yPredictItem = func(x[i]);
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
        var crossedIndex = Math.floor(Math.random() * minValues.length);
        newI1.data[crossedIndex] = i2.data[crossedIndex];
        newI2.data[crossedIndex] = i1.data[crossedIndex];
        return [newI1, newI2];
    };
    var individualMutate = function (i) {
        var newI = i.clone();
        var mutatedIndex = Math.floor(Math.random() * minValues.length);
        if (Math.random() < 0.5) {
            // mutate down
            newI.data[mutatedIndex] -=
                Math.random() *
                    (newI.data[mutatedIndex] - minValues[mutatedIndex]) *
                    0.1;
        }
        else {
            // mutate up
            newI.data[mutatedIndex] +=
                Math.random() *
                    (maxValues[mutatedIndex] - newI.data[mutatedIndex]) *
                    0.1;
        }
        newI.data[mutatedIndex] =
            Math.random() * (maxValues[mutatedIndex] - minValues[mutatedIndex]) +
                minValues[mutatedIndex];
        return newI;
    };
    var individualInit = function () {
        var data = [];
        for (var i = 0; i < minValues.length; i++) {
            data.push((maxValues[i] - minValues[i]) * Math.random() + minValues[i]);
        }
        return new Individual(data, undefined);
    };
    var ga = new ga_1.GA({
        individualCross: individualCross,
        individualMutate: individualMutate,
        individualInit: individualInit,
        maxGenerationToStop: 100,
        popSize: 1000,
    });
    ga.generalSize = maxIterations;
    ga.initPops();
    var trace = ga.start();
    return {
        values: ga.bestIndividual.data,
        error: ga.bestIndividual.fitness.value,
        iterations: trace.length,
        func: fitFunc.apply(void 0, __spread(ga.bestIndividual.data)),
    };
};
