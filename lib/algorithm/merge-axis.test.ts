import {
  merge,
  SingleMergeNumberInput,
  SingleMergeStringInput,
} from './merge-axis'

test('merge input string', () => {
  const lines1: SingleMergeStringInput[] = [
    [
      ['1', '2', '3'],
      [4, 5, 6],
    ],
    [
      ['2', '3', '4'],
      [4.1, 5, 6.2],
    ],
    [
      ['0', '1'],
      [3, 3.9],
    ],
  ]
  const mergedLines1 = merge(...lines1)
  const newXLine = mergedLines1[0] as string[]
  const newYLine1 = mergedLines1[1]
  const newYLine2 = mergedLines1[2]
  const newYLine3 = mergedLines1[3]
  expect(newXLine.length).toBe(5)
  expect(newXLine[0]).toBe('0')
  expect(newXLine[4]).toBe('4')
  expect(newYLine1.length).toBe(5)
  expect(newYLine1[0]).toBe(undefined)
  expect(newYLine1[1]).toBe(4)
  expect(newYLine1[4]).toBe(undefined)
  expect(newYLine2.length).toBe(5)
  expect(newYLine2[0]).toBe(undefined)
  expect(newYLine2[2]).toBe(4.1)
  expect(newYLine3.length).toBe(5)
  expect(newYLine3[0]).toBe(3)
  expect(newYLine3[2]).toBe(undefined)
})

test('merge input number', () => {
  const lines1: SingleMergeNumberInput[] = [
    [
      [1, 2, 3],
      [4, 5, 6],
    ],
    [
      [2, 3, 4],
      [4.1, 5, 6.2],
    ],
    [
      [0, 1],
      [3, 3.9],
    ],
  ]
  const mergedLines1 = merge(...lines1)
  const newXLine = mergedLines1[0] as string[]
  const newYLine1 = mergedLines1[1]
  const newYLine2 = mergedLines1[2]
  const newYLine3 = mergedLines1[3]
  expect(newXLine.length).toBe(5)
  expect(newXLine[0]).toBe(0)
  expect(newXLine[4]).toBe(4)
  expect(newYLine1.length).toBe(5)
  expect(newYLine1[0]).toBe(undefined)
  expect(newYLine1[1]).toBe(4)
  expect(newYLine1[4]).toBe(undefined)
  expect(newYLine2.length).toBe(5)
  expect(newYLine2[0]).toBe(undefined)
  expect(newYLine2[2]).toBe(4.1)
  expect(newYLine3.length).toBe(5)
  expect(newYLine3[0]).toBe(3)
  expect(newYLine3[2]).toBe(undefined)
})
