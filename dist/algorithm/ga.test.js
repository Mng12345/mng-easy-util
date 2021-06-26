"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var ga_1 = require("./ga");
var math_1 = require("../math");
var ComparableNumber = /** @class */ (function () {
    function ComparableNumber(value) {
        this.value = value;
    }
    ComparableNumber.prototype.compare = function (other) {
        return this.value - other.value;
    };
    ComparableNumber.prototype.clone = function () {
        return new ComparableNumber(this.value);
    };
    return ComparableNumber;
}());
var individualInit = function () {
    var data = [];
    data[0] = math_1.randomInt(-10, 10);
    data[1] = math_1.randomInt(-10, 10);
    return new Individual(data, undefined);
};
var individualCross = function (i1, i2) {
    var newI1 = i1.clone();
    var newI2 = i2.clone();
    newI1.data[0] = i2.data[0];
    newI2.data[0] = i1.data[0];
    return [newI1, newI2];
};
var individualMutate = function (i) {
    var newI = i.clone();
    newI.data[0] = math_1.randomInt(-10, 10);
    newI.data[1] = math_1.randomInt(-10, 10);
    return newI;
};
// min value of x^2 + y^2 with bounds [[-10, 10], [-10, 10]]
var Individual = /** @class */ (function (_super) {
    __extends(Individual, _super);
    function Individual() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Individual.prototype.calFitness = function () {
        var fitness = this.data[0] * this.data[0] + this.data[1] * this.data[1];
        this.fitness = new ComparableNumber(fitness);
        return this.fitness;
    };
    Individual.prototype.clone = function () {
        var data = __spreadArray([], __read(this.data));
        var fitness = this.fitness && this.fitness.clone();
        return new Individual(data, fitness);
    };
    return Individual;
}(ga_1.AbstractIndividual));
test('start', function () {
    var e_1, _a;
    var ga = new ga_1.GA({ individualCross: individualCross, individualMutate: individualMutate, individualInit: individualInit });
    var trace = ga.start();
    expect(ga.bestIndividual !== undefined).toBe(true);
    var calDistance = function (d1, d2) {
        var sum = 0;
        for (var i = 0; i < 2; i++) {
            sum += Math.pow(d1[i] - d2[i], 2);
        }
        return Math.sqrt(sum);
    };
    expect(calDistance(ga.bestIndividual.data, [0, 0]) <= 0.01).toBe(true);
    var generateCorrect = true;
    var computed = undefined;
    try {
        for (var trace_1 = __values(trace), trace_1_1 = trace_1.next(); !trace_1_1.done; trace_1_1 = trace_1.next()) {
            var item = trace_1_1.value;
            if (computed === undefined) {
                computed = item;
            }
            else {
                if (item.fitness.compare(computed.fitness) > 0) {
                    generateCorrect = false;
                    break;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (trace_1_1 && !trace_1_1.done && (_a = trace_1.return)) _a.call(trace_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    expect(generateCorrect).toBe(true);
});
test('select', function () {
    var ga = new ga_1.GA({ individualCross: individualCross, individualMutate: individualMutate, individualInit: individualInit });
    ga.initPops();
    var meanFitness = math_1.mean(ga.individuals.map(function (item) { return item.fitness.value; }));
    ga.select();
    var meanFitnessAfterSelect = math_1.mean(ga.individuals.map(function (item) { return item.fitness.value; }));
    expect(meanFitness > meanFitnessAfterSelect).toBe(true);
});
