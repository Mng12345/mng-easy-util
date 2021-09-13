"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const min_max_1 = require("./min-max");
test('min & max', () => {
    class Item {
        constructor(a, b) {
            this.a = a;
            this.b = b;
        }
        compare(other) {
            return this.a + this.b - other.a - other.b;
        }
    }
    const array = [new Item(1, 2), new Item(3, 4), new Item(0, 3), new Item(1, 1)];
    const [minVal, minIndex] = min_max_1.min(array, (item) => item);
    const [maxVal, maxIndex] = min_max_1.max(array, (item) => item);
    expect(minVal.compare(new Item(1, 1))).toBe(0);
    expect(minIndex).toBe(3);
    expect(maxVal.compare(new Item(3, 4))).toBe(0);
    expect(maxIndex).toBe(1);
});
