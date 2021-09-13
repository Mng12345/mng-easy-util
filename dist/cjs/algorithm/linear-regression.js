"use strict";
// fit curve by linear-regression which implemented by ga
// this code is under beta stage!! TODO
Object.defineProperty(exports, "__esModule", { value: true });
exports.fit = void 0;
const ga_1 = require("./ga");
const min_max_1 = require("../min-max");
const defaultFitFunc = (...params) => {
    if (params.length <= 1)
        throw new Error(`the length of params must > 1`);
    const kList = params.slice(0, params.length - 1);
    const b = params[params.length - 1];
    return (...x) => {
        let sum = 0;
        for (let i = 0; i < x.length; i++) {
            sum += x[i] * kList[i];
        }
        sum += b;
        return sum;
    };
};
const fit = ({ x, y, initValues, fitFunc = defaultFitFunc, maxIterations = 500, tolerance = 0.01, }) => {
    class Individual extends ga_1.AbstractIndividual {
        calFitness() {
            const func = fitFunc(...this.data);
            let err = 0;
            for (let i = 0; i < x.length; i++) {
                const yPredictItem = func(...x[i]);
                err += Math.abs(y[i] - yPredictItem);
            }
            this.fitness = new min_max_1.ComparableNumber(err, tolerance);
            return this.fitness;
        }
        clone() {
            const data = [...this.data];
            const fitness = this.fitness && this.fitness.clone();
            return new Individual(data, fitness);
        }
    }
    const individualCross = (i1, i2) => {
        const newI1 = i1.clone();
        const newI2 = i2.clone();
        const crossedIndex = Math.floor(Math.random() * initValues.length);
        newI1.data[crossedIndex] = i2.data[crossedIndex];
        newI2.data[crossedIndex] = i1.data[crossedIndex];
        return [newI1, newI2];
    };
    const individualMutate = (i) => {
        const newI = i.clone();
        const mutatedIndex = Math.floor(Math.random() * initValues.length);
        const valueGap = newI.data[mutatedIndex] - initValues[mutatedIndex];
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
    const individualInit = () => {
        const data = [];
        for (let i = 0; i < initValues.length; i++) {
            data.push(initValues[i] * Math.random());
        }
        return new Individual(data, undefined);
    };
    const ga = new ga_1.GA({
        individualCross,
        individualMutate,
        individualInit,
        maxGenerationToStop: 100,
        popSize: 1000,
        pMutate: 0.25,
        pCross: 0.9,
    });
    ga.generalSize = maxIterations;
    ga.initPops();
    const trace = ga.start();
    return {
        values: ga.bestIndividual.data,
        error: ga.bestIndividual.fitness.value,
        iterations: trace.length,
    };
};
exports.fit = fit;
