// general genetic algorithm
import { randomInt, randomNIntNotRepeat, sample } from '../math';
import { min } from '../min-max';
export class AbstractIndividual {
    constructor(data, fitness) {
        this.data = data;
        this.fitness = fitness;
    }
}
/**
 * class to stop the ga algorithm
 */
export class Stopper {
    constructor(maxQueueSize) {
        this.maxQueueSize = maxQueueSize;
        this.valueQueue = [];
    }
    feed(value) {
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
    }
    canStop() {
        return this.valueQueue.length >= this.maxQueueSize;
    }
}
export class GA {
    constructor(config) {
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
    initPops() {
        this.individuals = [];
        for (let i = 0; i < this.popSize; i++) {
            this.individuals[i] = this.individualInit();
            this.individuals[i].calFitness();
        }
        this.bestIndividual = min(this.individuals, (item) => item.fitness)[0];
    }
    cross() {
        for (let i = 0; i < this.popSize; i++) {
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
    mutate() {
        for (let i = 0; i < this.popSize; i++) {
            const p = Math.random();
            if (p < this.pMutate) {
                const index = randomInt(0, this.popSize);
                const individual = this.individualMutate(this.individuals[index]);
                individual.calFitness();
                this.individuals[index] = individual;
            }
        }
    }
    select() {
        // assume the individual of individuals have calculated fitness
        this.individuals.sort((i1, i2) => i1.fitness.compare(i2.fitness));
        // select 80% items in first 20%
        // select 20% items in last 80%
        const first20 = Math.floor(0.2 * this.popSize);
        const last80 = this.popSize - first20;
        const leftItems = sample(this.individuals.slice(0, first20), last80);
        const rightItems = sample(this.individuals.slice(first20), first20);
        this.individuals = leftItems.concat(rightItems);
    }
    /**
     * by default, the more small the fitness is, the more better it is
     */
    saveBest() {
        const currBestIndividual = min(this.individuals, (item) => item.fitness)[0];
        if (currBestIndividual.fitness.compare(this.bestIndividual.fitness) < 0) {
            this.bestIndividual = currBestIndividual.clone();
            const index = randomInt(0, this.popSize);
            this.individuals[index] = currBestIndividual.clone();
        }
    }
    canStop() {
        this.stopper.feed(this.bestIndividual.fitness);
        return this.stopper.canStop();
    }
    /**
     * start genetic algorithm
     */
    start() {
        const res = [];
        this.initPops();
        for (let i = 0; i < this.generalSize; i++) {
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
    }
}
