// general genetic algorithm

import {randomInt, randomNIntNotRepeat, sample} from "../math";
import lodash from "lodash";
import {Comparable, min} from "../min-max";
import {Cloneable} from "../clone";

export abstract class AbstractIndividual<TData, TFitness> implements Cloneable {
    constructor(public data: TData, public fitness: TFitness | undefined) {}
    abstract calFitness(): TFitness;
    abstract clone(): AbstractIndividual<TData, TFitness>;
}

export class GA<TIndividual extends AbstractIndividual<TData, TFitness>, TData, TFitness extends Comparable> {
    popSize: number = 200
    generalSize: number = 400
    pCross: number = 0.75
    pMutate: number = 0.1
    individuals: TIndividual[] = []
    bestIndividual: TIndividual | undefined
    individualCross: (i1:  TIndividual, i2: TIndividual) => [TIndividual, TIndividual]
    individualMutate: (i: TIndividual) => TIndividual
    individualInit: () => TIndividual

    constructor(config: {popSize?: number, generalSize?: number, pCross?: number, pMutate?: number,
        individualCross: (i1:  TIndividual, i2: TIndividual) => [TIndividual, TIndividual],
        individualMutate: (i: TIndividual) => TIndividual,
        individualInit: () => TIndividual}) {
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
    }

    initPops() {
        this.individuals = [];
        for (let i=0; i<this.popSize; i++) {
            this.individuals[i] = this.individualInit();
            this.individuals[i].calFitness();
        }
        this.bestIndividual = min(this.individuals, item => item.fitness!)[0];
    }

    cross(): void {
        for (let i=0; i<this.popSize; i++) {
            const p = Math.random();
            if (p < this.pCross) {
                const [index1, index2, _] = randomNIntNotRepeat(0, this.popSize, 2);
                const [i1, i2] = this.individualCross(this.individuals[index1], this.individuals[index2]);
                this.individuals[index1] = i1;
                this.individuals[index2] = i2;
            }
        }
        for (let individual of this.individuals) {
            individual.calFitness();
        }
    }

    mutate(): void {
        for (let i=0; i<this.popSize; i++) {
            const p = Math.random();
            if (p < this.pMutate) {
                const index = randomInt(0, this.popSize);
                const individual = this.individualMutate(this.individuals[index]);
                individual.calFitness();
                this.individuals[index] = individual;
            }
        }
    }

    select(): void {
        // assume the individual of individuals have calculated fitness
        this.individuals.sort((i1, i2) => i1.fitness!.compare(i2.fitness!))
        // select 80% items in first 20%
        // select 20% items in last 80%
        const first20 = Math.floor(0.2 * this.popSize);
        const last80 = this.popSize  - first20;
        const leftItems = sample(this.individuals.slice(0, first20), last80);
        const rightItems = sample(this.individuals.slice(first20), first20);
        this.individuals = leftItems.concat(rightItems);
    }

    /**
     * by default, the more small the fitness is, the more better it is
     */
    saveBest(): void {
        const currBestIndividual = min(this.individuals, item => item.fitness!)[0]!;
        if (currBestIndividual.fitness!.compare(this.bestIndividual!.fitness!) < 0) {
            this.bestIndividual = currBestIndividual.clone() as TIndividual;
            const index = randomInt(0, this.popSize);
            this.individuals[index] = currBestIndividual.clone() as TIndividual;
        }
    }

    /**
     * start genetic algorithm
     */
    start(): TIndividual[] {
        const res: TIndividual[] = [];
        this.initPops();
        for (let i=0; i<this.generalSize; i++) {
            this.select();
            this.cross();
            this.mutate();
            this.saveBest();
            res[i] = this.bestIndividual!.clone() as TIndividual;
        }
        return res;
    }

}
