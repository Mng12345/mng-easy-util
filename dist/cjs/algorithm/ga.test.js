"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ga_1 = require("./ga");
const math_1 = require("../math");
class ComparableNumber {
    constructor(value) {
        this.value = value;
    }
    compare(other) {
        return this.value - other.value;
    }
    clone() {
        return new ComparableNumber(this.value);
    }
}
const individualInit = () => {
    const data = [];
    data[0] = math_1.randomInt(-10, 10);
    data[1] = math_1.randomInt(-10, 10);
    return new Individual(data, undefined);
};
const individualCross = (i1, i2) => {
    const newI1 = i1.clone();
    const newI2 = i2.clone();
    newI1.data[0] = i2.data[0];
    newI2.data[0] = i1.data[0];
    return [newI1, newI2];
};
const individualMutate = (i) => {
    const newI = i.clone();
    newI.data[0] = math_1.randomInt(-10, 10);
    newI.data[1] = math_1.randomInt(-10, 10);
    return newI;
};
// min value of x^2 + y^2 with bounds [[-10, 10], [-10, 10]]
class Individual extends ga_1.AbstractIndividual {
    calFitness() {
        const fitness = this.data[0] * this.data[0] + this.data[1] * this.data[1];
        this.fitness = new ComparableNumber(fitness);
        return this.fitness;
    }
    clone() {
        const data = [...this.data];
        const fitness = this.fitness && this.fitness.clone();
        return new Individual(data, fitness);
    }
}
test('start', () => {
    const ga = new ga_1.GA({ individualCross, individualMutate, individualInit });
    const trace = ga.start();
    expect(ga.bestIndividual !== undefined).toBe(true);
    const calDistance = (d1, d2) => {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            sum += Math.pow(d1[i] - d2[i], 2);
        }
        return Math.sqrt(sum);
    };
    expect(calDistance(ga.bestIndividual.data, [0, 0]) <= 0.01).toBe(true);
    let generateCorrect = true;
    let computed = undefined;
    for (let item of trace) {
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
    expect(generateCorrect).toBe(true);
});
test('select', () => {
    const ga = new ga_1.GA({ individualCross, individualMutate, individualInit });
    ga.initPops();
    const meanFitness = math_1.mean(ga.individuals.map((item) => item.fitness.value));
    ga.select();
    const meanFitnessAfterSelect = math_1.mean(ga.individuals.map((item) => item.fitness.value));
    expect(meanFitness > meanFitnessAfterSelect).toBe(true);
});
