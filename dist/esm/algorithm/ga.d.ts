import { Comparable } from '../min-max';
import { Cloneable } from '../clone';
export declare abstract class AbstractIndividual<TData, TFitness> implements Cloneable {
    data: TData;
    fitness: TFitness | undefined;
    constructor(data: TData, fitness: TFitness | undefined);
    abstract calFitness(): TFitness;
    abstract clone(): AbstractIndividual<TData, TFitness>;
}
/**
 * class to stop the ga algorithm
 */
export declare class Stopper {
    maxQueueSize: number;
    private valueQueue;
    constructor(maxQueueSize: number);
    feed(value: Comparable): void;
    canStop(): boolean;
}
export declare class GA<TIndividual extends AbstractIndividual<TData, TFitness>, TData, TFitness extends Comparable> {
    popSize: number;
    generalSize: number;
    pCross: number;
    pMutate: number;
    individuals: TIndividual[];
    bestIndividual: TIndividual | undefined;
    individualCross: (i1: TIndividual, i2: TIndividual) => [TIndividual, TIndividual];
    individualMutate: (i: TIndividual) => TIndividual;
    individualInit: () => TIndividual;
    stopper: Stopper;
    constructor(config: {
        popSize?: number;
        generalSize?: number;
        pCross?: number;
        pMutate?: number;
        individualCross: (i1: TIndividual, i2: TIndividual) => [TIndividual, TIndividual];
        individualMutate: (i: TIndividual) => TIndividual;
        individualInit: () => TIndividual;
        maxGenerationToStop?: number;
    });
    initPops(): void;
    cross(): void;
    mutate(): void;
    select(): void;
    /**
     * by default, the more small the fitness is, the more better it is
     */
    saveBest(): void;
    canStop(): boolean;
    /**
     * start genetic algorithm
     */
    start(): TIndividual[];
}
