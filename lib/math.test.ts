import {
  add,
  dotMultiply,
  ema,
  mean,
  r2,
  std,
  toBNumber,
  variance,
} from './math'
import { math } from './index'

test('ema', () => {
  const data = [5.1, 5.2, 5.0, 4.9, 5.3, 5.5, 4.8]
  const emaData = ema(data, 4)
  expect(
    Math.abs(data[data.length - 1] - emaData[emaData.length - 1]) < 2
  ).toBe(true)
})

test('variance & std', () => {
  const a1 = [1, 1, 1]
  const a2 = [1, 0, 1]
  expect(variance(a1)).toBe(0)
  expect(Math.abs(variance(a2) - 1 / 3) <= 0.01).toBe(true)
  expect(std(a1)).toBe(0)
  expect(Math.abs(std(a2) - Math.sqrt(1 / 3)) <= 0.01).toBe(true)
})

test('r2', () => {
  const a1 = [1, 0, 1]
  const a2 = [1, 0, 1]
  const a3 = [1, 1, 0]
  expect(r2(a1, a2)).toBe(1)
  const r2a13 = r2(a1, a3)
  expect(r2a13 <= 1).toBe(true)
})

test('toBNumber', () => {
  console.log(toBNumber(12, 4))
  console.log(toBNumber(12, 8))
  // console.log(toBNumber(12, 2))
})

test('convertColorToHexNumberArray', () => {
  const array1 = math.convertColorToHexNumberArray(0x00ff12)
  expect(array1[0]).toBe(0)
  expect(array1[2]).toBe(15)
  expect(array1[5]).toBe(2)
})

test('convertColorToHexCharArray', () => {
  const array1 = math.convertColorToHexCharArray(0x00ff12)
  expect(array1[0]).toBe('0')
  expect(array1[2]).toBe('f')
  expect(array1[5]).toBe('2')
})

test('parseHexColorToNumber', () => {
  const value = math.parseHexColorToNumber('0x00ff12')
  expect(value).toBe(0x00ff12)
})

test('ma', () => {
  const data = [1, 2, 3, 4, 5] as number[]
  const n = 3
  const ma = math.ma(data, 3)
  expect(ma[0]).toBe(math.sum([1, 2, 3]) / n)
  expect(ma[1]).toBe(math.sum([2, 3, 4]) / n)
  expect(ma[2]).toBe(math.sum([3, 4, 5]) / n)
  expect(ma.length).toBe(3)
})
