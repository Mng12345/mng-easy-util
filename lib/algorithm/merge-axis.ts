// merge multiply [[x1, y1], [x2, y2], ...] line into [x, y1, y2, y3, ...]
import lodash from 'lodash'
import { Stream } from '../stream'

export type MergeReturn = [string[] | number[], ...(number | undefined)[][]]
export type SingleMergeStringInput = [string[], number[]]
export type SingleMergeNumberInput = [number[], number[]]

function isSingleMergeStringInput(
  lines: any
): lines is SingleMergeStringInput[] {
  let flag = true
  for (const line of lines) {
    if (
      !(
        line.length &&
        line.length === 2 &&
        line[0].length &&
        line[0].length >= 1 &&
        typeof line[0][0] === 'string'
      )
    ) {
      flag = false
      break
    }
  }
  return flag
}

function isSingleMergeNumberInput(
  lines: any
): lines is SingleMergeNumberInput[] {
  let flag = true
  for (const line of lines) {
    if (
      !(
        line.length &&
        line.length === 2 &&
        line[0].length &&
        line[0].length >= 1 &&
        typeof line[0][0] === 'number'
      )
    ) {
      flag = false
      break
    }
  }
  return flag
}

export function merge(
  ...lines: SingleMergeStringInput[] | SingleMergeNumberInput[]
): MergeReturn {
  if (isSingleMergeNumberInput(lines)) {
    const xLines = lodash.map(lines, (line) => line[0])
    const yLines = lines.map((line) => line[1])
    const xItems = lodash.flatten(xLines)
    const xItemUnique = Stream.of(new Set(xItems).keys()).collect().sort()
    const res: MergeReturn = [xItemUnique]
    for (let i = 0; i < xLines.length; i++) {
      const xLine = xLines[i]
      const yLine = yLines[i]
      if (xLine.length !== yLine.length) {
        throw new Error(`the length of xLine must equals to yLine.`)
      }
      const newYLine: (number | undefined)[] = []
      for (let j = 0; j < xItemUnique.length; j++) {
        let yItem: number | undefined = undefined
        for (let k = 0; k < xLine.length; k++) {
          if (xLine[k] === xItemUnique[j]) {
            yItem = yLine[k]
            break
          }
        }
        newYLine.push(yItem)
      }
      res.push(newYLine)
    }
    return res
  } else if (isSingleMergeStringInput(lines)) {
    const xLines = lodash.map(lines, (line) => line[0])
    const yLines = lines.map((line) => line[1])
    const xItems = lodash.flatten(xLines)
    const xItemUnique = Stream.of(new Set(xItems).keys()).collect().sort()
    const res: MergeReturn = [xItemUnique]
    for (let i = 0; i < xLines.length; i++) {
      const xLine = xLines[i]
      const yLine = yLines[i]
      if (xLine.length !== yLine.length) {
        throw new Error(`the length of xLine must equals to yLine.`)
      }
      const newYLine: (number | undefined)[] = []
      for (let j = 0; j < xItemUnique.length; j++) {
        let yItem: number | undefined = undefined
        for (let k = 0; k < xLine.length; k++) {
          if (xLine[k] === xItemUnique[j]) {
            yItem = yLine[k]
            break
          }
        }
        newYLine.push(yItem)
      }
      res.push(newYLine)
    }
    return res
  } else {
    throw new Error(
      `type of lines must be SingleMergeStringInput or SingleMergeNumberInput.`
    )
  }
}
