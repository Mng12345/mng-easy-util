// fit the curve by GA algorithm
import { AbstractIndividual, GA } from './ga';
import { ComparableNumber } from '../min-max';
export const curveFit = ({ x, y, minValues, maxValues, maxIterations = 100, tolerance = 0.001, fitFunc, }) => {
    class Individual extends AbstractIndividual {
        calFitness() {
            const func = fitFunc(...this.data);
            let err = 0;
            for (let i = 0; i < x.length; i++) {
                const yPredictItem = func(x[i]);
                err += Math.abs(y[i] - yPredictItem);
            }
            this.fitness = new ComparableNumber(err, tolerance);
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
        const crossedIndex = Math.floor(Math.random() * minValues.length);
        newI1.data[crossedIndex] = i2.data[crossedIndex];
        newI2.data[crossedIndex] = i1.data[crossedIndex];
        return [newI1, newI2];
    };
    const individualMutate = (i) => {
        const newI = i.clone();
        const mutatedIndex = Math.floor(Math.random() * minValues.length);
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
    const individualInit = () => {
        const data = [];
        for (let i = 0; i < minValues.length; i++) {
            data.push((maxValues[i] - minValues[i]) * Math.random() + minValues[i]);
        }
        return new Individual(data, undefined);
    };
    const ga = new GA({
        individualCross,
        individualMutate,
        individualInit,
        maxGenerationToStop: 100,
        popSize: 1000,
    });
    ga.generalSize = maxIterations;
    ga.initPops();
    const trace = ga.start();
    return {
        values: ga.bestIndividual.data,
        error: ga.bestIndividual.fitness.value,
        iterations: trace.length,
        func: fitFunc(...ga.bestIndividual.data),
    };
};
