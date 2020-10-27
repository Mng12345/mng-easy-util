// fit the curve by GA algorithm

import {AbstractIndividual, GA} from "./ga";
import {Cloneable} from "../clone";
import {Comparable} from "../min-max";
import {isCloseable, randomInt} from "../math";

export type Options = {
    x: number[],
    y: number[],
    minValues: number[],
    maxValues: number[],
    maxIterations?: number,
    tolerance?: number,
    fitFunc: (...params: number[]) => (x: number) => number
};

export type Parameter = {
    values: number[],
    error: number,
    iterations: number,
    func: (x: number) => number
};

export const curveFit = ({x, y, minValues, maxValues, maxIterations = 100, tolerance = 0.001, fitFunc}: Options): Parameter => {

    class ComparableNumber implements Cloneable, Comparable {
        constructor(public value: number) {
        }

        compare(this: ComparableNumber, other: ComparableNumber): number {
            if (this.value === other.value) {
                return 0;
            } else if (isCloseable(this.value, other.value, tolerance)) {
                return 0;
            } else return this.value < other.value ? -1 : 1;
        }
        clone(): ComparableNumber {
            return new ComparableNumber(this.value);
        }
    }


    class Individual extends AbstractIndividual<number[], ComparableNumber> {

        calFitness(): ComparableNumber {
            const func = fitFunc(...this.data);
            let err = 0;
            for (let i=0; i<x.length; i++) {
                const yPredictItem = func(x[i]);
                err += Math.abs(y[i] - yPredictItem);
            }
            this.fitness = new ComparableNumber(err);
            return this.fitness;
        }

        clone(): Individual {
            const data: number[] = [...this.data];
            const fitness = this.fitness && this.fitness.clone();
            return new Individual(data, fitness);
        }
    }

    const individualCross = (i1: Individual, i2: Individual): [Individual, Individual] => {
        const newI1 = i1.clone();
        const newI2 = i2.clone();
        const crossedIndex = Math.floor(Math.random() * minValues.length);
        newI1.data[crossedIndex] = i2.data[crossedIndex];
        newI2.data[crossedIndex] = i1.data[crossedIndex];
        return [newI1, newI2];
    };

    const individualMutate = (i: Individual): Individual => {
        const newI = i.clone();
        const mutatedIndex = Math.floor(Math.random() * minValues.length);
        if (Math.random() < 0.5) {
            // mutate down
            newI.data[mutatedIndex] -= Math.random() * (newI.data[mutatedIndex] - minValues[mutatedIndex]) * 0.1;
        } else {
            // mutate up
            newI.data[mutatedIndex] += Math.random() * (maxValues[mutatedIndex] - newI.data[mutatedIndex]) * 0.1;
        }
        newI.data[mutatedIndex] = Math.random() * (maxValues[mutatedIndex] - minValues[mutatedIndex])
            + minValues[mutatedIndex];
        return newI;
    };

    const individualInit = (): Individual => {
        const data: number[] = [];
        for (let i=0; i<minValues.length; i++) {
            data.push((maxValues[i] - minValues[i]) * Math.random() + minValues[i]);
        }
        return new Individual(data, undefined);
    };

    const ga = new GA({individualCross, individualMutate, individualInit, maxGenerationToStop: 100, popSize: 1000});
    ga.generalSize = maxIterations;
    ga.initPops();
    const trace = ga.start();
    return {
        values: ga.bestIndividual!.data,
        error: ga.bestIndividual!.fitness!.value,
        iterations: trace.length,
        func: fitFunc(...ga.bestIndividual!.data),
    }

}
