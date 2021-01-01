import { Comparable, max, min } from './min-max'

test('min & max', () => {
  class Item implements Comparable {
    constructor(public a: number, public b: number) {}

    compare(other: Item) {
      return this.a + this.b - other.a - other.b
    }
  }

  const array = [new Item(1, 2), new Item(3, 4), new Item(0, 3), new Item(1, 1)]
  const [minVal, minIndex] = min(array, (item) => item)
  const [maxVal, maxIndex] = max(array, (item) => item)
  expect(minVal!.compare(new Item(1, 1))).toBe(0)
  expect(minIndex).toBe(3)
  expect(maxVal!.compare(new Item(3, 4))).toBe(0)
  expect(maxIndex).toBe(1)
})
