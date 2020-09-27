import {HashSet} from "./hashset";
import {HashCode} from "./hashmap";
import lodash from 'lodash';
import {Stream} from "./stream";

test('entries', () => {
    const set = new HashSet<number>();
    set.add(1).add(2);
    expect((() => {
        let sum = 0.;
        for (let item of set) {
            sum += item;
        }
        return sum;
    })()).toBe(3);
})

const hashCode = (key: Key): string => {
    return `a: ${key.a}, b: ${key.b}`;
}

class Key implements HashCode {
    constructor(public a: number, public b: number) {
    }
    hashCode(): string {
        return `a: ${this.a}, b: ${this.b}`;
    }
}

test('keys & values', () => {
    const set = new HashSet<number>();
    set.add(1).add(2);
    expect((() => {
        let sum = 0.;
        for (let item of set) {
            sum += item;
        }
        return sum;
    })()).toBe(3);
    const objSet = new HashSet<Key>();
    objSet.add(new Key(1, 2)).add(new Key(3, 4));
    expect(Stream.of(objSet.keys()).collect()[0].hashCode()).toBe(new Key(1, 2).hashCode());
})
