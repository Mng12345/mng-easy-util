import { Lru } from './cache.lru';
test('constructor & put & get', () => {
    const lru = new Lru(4, (key) => key + '');
    lru.put(1, 1);
    lru.put(2, 2);
    lru.put(3, 3);
    lru.put(4, 4);
    console.log(`values:`, lru.headNode.toArray().map((item) => item.value));
    const v2 = lru.get(2);
    expect(v2).toBe(2);
    console.log(`values:`, lru.headNode.toArray().map((item) => item.value));
    expect(lru.tailNode.value.value).toBe(2);
    lru.put(5, 5);
    console.log(`values:`, lru.headNode.toArray().map((item) => item.value));
    expect(lru.headNode.value.value).toBe(3);
    const strLru = new Lru(5, (key) => key);
    strLru.put('abc', 123);
    expect(strLru.get('abc')).toBe(123);
});
