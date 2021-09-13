"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashset_1 = require("./hashset");
const stream_1 = require("./stream");
test('entries', () => {
    const set = new hashset_1.HashSet();
    set.add(1).add(2);
    expect((() => {
        let sum = 0;
        for (let item of set) {
            sum += item;
        }
        return sum;
    })()).toBe(3);
});
const hashCode = (key) => {
    return `a: ${key.a}, b: ${key.b}`;
};
class Key {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    hashCode() {
        return `a: ${this.a}, b: ${this.b}`;
    }
}
test('keys & values', () => {
    const set = new hashset_1.HashSet();
    set.add(1).add(2);
    expect((() => {
        let sum = 0;
        for (let item of set) {
            sum += item;
        }
        return sum;
    })()).toBe(3);
    const objSet = new hashset_1.HashSet();
    objSet.add(new Key(1, 2)).add(new Key(3, 4));
    expect(stream_1.Stream.of(objSet.keys()).collect()[0].hashCode()).toBe(new Key(1, 2).hashCode());
});
