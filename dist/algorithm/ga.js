"use strict";
// general genetic algorithm
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
exports.GA = exports.Stopper = exports.AbstractIndividual = void 0;
var math_1 = require("../math");
var min_max_1 = require("../min-max");
var AbstractIndividual = /** @class */ (function () {
    function AbstractIndividual(data, fitness) {
        this.data = data;
        this.fitness = fitness;
    }
    return AbstractIndividual;
}());
exports.AbstractIndividual = AbstractIndividual;
/**
 * class to stop the ga algorithm
 */
var Stopper = /** @class */ (function () {
    function Stopper(maxQueueSize) {
        this.maxQueueSize = maxQueueSize;
        this.valueQueue = [];
    }
    Stopper.prototype.feed = function (value) {
        if (this.valueQueue.length === 0) {
            this.valueQueue.push(value);
            return;
        }
        if (value.compare(this.valueQueue[this.valueQueue.length - 1]) === 0) {
            if (this.valueQueue.length >= this.maxQueueSize) {
                this.valueQueue.pop();
            }
            this.valueQueue.push(value);
        }
        else {
            // new breaks value, clear the queue!
            this.valueQueue = [value];
        }
    };
    Stopper.prototype.canStop = function () {
        return this.valueQueue.length >= this.maxQueueSize;
    };
    return Stopper;
}());
exports.Stopper = Stopper;
var GA = /** @class */ (function () {
    function GA(config) {
        this.popSize = 200;
        this.generalSize = 400;
        this.pCross = 0.75;
        this.pMutate = 0.15;
        this.individuals = [];
        this.individualCross = config.individualCross;
        this.individualMutate = config.individualMutate;
        this.individualInit = config.individualInit;
        if (config.popSize) {
            this.popSize = config.popSize;
        }
        if (config.generalSize) {
            this.generalSize = config.generalSize;
        }
        if (config.pCross) {
            this.pCross = config.pCross;
        }
        if (config.pMutate) {
            this.pMutate = config.pMutate;
        }
        if (!config.maxGenerationToStop) {
            config.maxGenerationToStop = Math.min(20, this.generalSize);
        }
        this.stopper = new Stopper(config.maxGenerationToStop);
    }
    GA.prototype.initPops = function () {
        this.individuals = [];
        for (var i = 0; i < this.popSize; i++) {
            this.individuals[i] = this.individualInit();
            this.individuals[i].calFitness();
        }
        this.bestIndividual = min_max_1.min(this.individuals, function (item) { return item.fitness; })[0];
    };
    GA.prototype.cross = function () {
        var e_1, _a;
        for (var i = 0; i < this.popSize; i++) {
            var p = Math.random();
            if (p < this.pCross) {
                var _b = __read(math_1.randomNIntNotRepeat(0, this.popSize, 2), 3), index1 = _b[0], index2 = _b[1], _1 = _b[2];
                var _c = __read(this.individualCross(this.individuals[index1], this.individuals[index2]), 2), i1 = _c[0], i2 = _c[1];
                this.individuals[index1] = i1;
                this.individuals[index2] = i2;
            }
        }
        try {
            for (var _d = __values(this.individuals), _e = _d.next(); !_e.done; _e = _d.next()) {
                var individual = _e.value;
                individual.calFitness();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    GA.prototype.mutate = function () {
        for (var i = 0; i < this.popSize; i++) {
            var p = Math.random();
            if (p < this.pMutate) {
                var index = math_1.randomInt(0, this.popSize);
                var individual = this.individualMutate(this.individuals[index]);
                individual.calFitness();
                this.individuals[index] = individual;
            }
        }
    };
    GA.prototype.select = function () {
        // assume the individual of individuals have calculated fitness
        this.individuals.sort(function (i1, i2) { return i1.fitness.compare(i2.fitness); });
        // select 80% items in first 20%
        // select 20% items in last 80%
        var first20 = Math.floor(0.2 * this.popSize);
        var last80 = this.popSize - first20;
        var leftItems = math_1.sample(this.individuals.slice(0, first20), last80);
        var rightItems = math_1.sample(this.individuals.slice(first20), first20);
        this.individuals = leftItems.concat(rightItems);
    };
    /**
     * by default, the more small the fitness is, the more better it is
     */
    GA.prototype.saveBest = function () {
        var currBestIndividual = min_max_1.min(this.individuals, function (item) { return item.fitness; })[0];
        if (currBestIndividual.fitness.compare(this.bestIndividual.fitness) < 0) {
            this.bestIndividual = currBestIndividual.clone();
            var index = math_1.randomInt(0, this.popSize);
            this.individuals[index] = currBestIndividual.clone();
        }
    };
    GA.prototype.canStop = function () {
        this.stopper.feed(this.bestIndividual.fitness);
        return this.stopper.canStop();
    };
    /**
     * start genetic algorithm
     */
    GA.prototype.start = function () {
        var res = [];
        this.initPops();
        for (var i = 0; i < this.generalSize; i++) {
            this.select();
            this.cross();
            this.mutate();
            this.saveBest();
            res[i] = this.bestIndividual.clone();
            if (this.canStop()) {
                break;
            }
        }
        return res;
    };
    return GA;
}());
exports.GA = GA;
