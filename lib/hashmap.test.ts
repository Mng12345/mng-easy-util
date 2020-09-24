import {HashMap} from "./hashmap";

test('new HashMap', () => {
    const map = new HashMap();
    expect(map.size).toBe(0);
})

test('set & get', () => {
    const map = new HashMap();
    map.set({a: 1, b: 2}, 3);
    const v = map.get({a: 1, b: 2});
    expect(v).toBe(3);
})

test('Symbol.iterator', () => {
    const map = new HashMap();
    map.set(1, 2);
    for (let [k, v] of map) {
        expect(k).toBe(1);
        expect(v).toBe(2);
    }
})

test('entries', () => {
    const map = new HashMap();
    map.set(1, 2);
    for (let [k, v] of map.entries()) {
        expect(k).toBe(1);
        expect(v).toBe(2);
    }
})

test('keys & values', () => {
    const map = new HashMap();
    map.set(1, 2);
    for (let k of map.keys()) {
        expect(k).toBe(1);
    }
    for (let v of map.values()) {
        expect(v).toBe(2);
    }
})

test('size', () => {
    const map = new HashMap();
    map.set(1, 2);
    expect(map.size).toBe(1);
})

test('clear', () => {
    const map = new HashMap();
    map.set(1, 2);
    expect(map.size).toBe(1);
    map.clear();
    expect(map.size).toBe(0);
})

test('delete', () => {
    const map = new HashMap();
    map.set(1, 2);
    expect(map.size).toBe(1);
    map.delete(1);
    expect(map.size).toBe(0);
    map.set({a: 1, b: 2}, 3);
    expect(map.size).toBe(1);
    map.delete({a: 1, b: 2});
    expect(map.size).toBe(0);
})

test('forEach', () => {
    const map = new HashMap();
    map.set(1, 2);
    map.set(2, 3);
    map.forEach(((value, key, map) => {
        expect(value === 2 || value === 3).toBe(true);
        expect(key === 1 || key === 2).toBe(true);
    }))
})

test('has', () => {
    const map = new HashMap();
    map.set(1, 2);
    map.set({a: 1, b: 2}, 3);
    expect(map.has(1)).toBe(true);
    expect(map.has({a: 1, b: 2})).toBe(true);
})
