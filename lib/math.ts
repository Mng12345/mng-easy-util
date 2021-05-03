import lodash from 'lodash'

/**
 * generate random int between [low, high)
 * @param low
 * @param high
 */
export function randomInt(low: number, high: number) {
  return Math.floor((high - low) * Math.random()) + low
}

/**
 * random n not repeat int between [low, high)
 * @param low
 * @param high
 * @param n
 */
export function randomNIntNotRepeat(
  low: number,
  high: number,
  n: number
): number[] {
  const nums: { [index: number]: undefined } = {}
  while (true) {
    const index = randomInt(low, high)
    nums[index] = undefined
    if (Object.keys(nums).length >= n) {
      break
    }
  }
  return Object.keys(nums).map((item) => parseInt(item))
}

/**
 * select n items of data
 * @param data
 * @param n
 */
export function sample<T>(data: T[], n: number): T[] {
  const res: T[] = []
  const len = data.length
  for (let i = 0; i < n; i++) {
    res[i] = data[randomInt(0, len)]
  }
  return res
}

/**
 * sum
 * @param data
 */
export function sum(data: number[]): number {
  let sumVal = 0
  for (let item of data) {
    sumVal += item
  }
  return sumVal
}

/**
 * calculate mean value of data
 * @param data
 */
export function mean(data: number[]) {
  return sum(data) / data.length
}

/**
 * calculate ma line of data with window n
 * @param data
 * @param n
 */
export function ma(data: number[], n: number) {
  let sumVal = sum(data.slice(0, n))
  const res: number[] = [sumVal / n]
  const len = data.length
  let index = 0
  for (let i = n; i < len; i++) {
    sumVal += data[i] - data[i - n]
    res[++index] = sumVal / n
  }
  return res
}

/**
 * ema
 * @param data
 * @param n
 */
export function ema(data: number[], n: number) {
  const res: number[] = []
  res[0] = data[0]
  const len = data.length
  for (let i = 1; i < len; i++) {
    res[i] = (2 / (n + 1)) * data[i] + ((n - 1) / (n + 1)) * res[i - 1]
  }
  return res
}

/**
 * dif of two array
 * @param d1
 * @param d2
 */
export function dif(d1: number[], d2: number[]): number[] {
  if (d1.length !== d2.length) {
    throw new Error(`the length of d1 must equals to d2`)
  }
  const res: number[] = []
  for (let i = 0; i < d1.length; i++) {
    res[i] = d1[i] - d2[i]
  }
  return res
}

/**
 * array * v
 * @param data
 * @param v
 */
export function multiply(data: number[], v: number | number[]): number[] {
  const res: number[] = []
  if (typeof v === 'number') {
    for (let i = 0; i < data.length; i++) {
      res[i] = data[i] * v
    }
    return res
  } else if (v && v.length && typeof v[0] === 'number') {
    if (data.length !== v.length) {
      throw new Error(`the length of data must equals to v`)
    }
    for (let i = 0; i < data.length; i++) {
      res[i] = data[i] * v[i]
    }
    return res
  } else {
    throw Error(`typeof v must be number|number[]`)
  }
}

/**
 * data + v
 * @param data
 * @param v
 */
export function add(data: number[], v: number | number[]): number[] {
  const res: number[] = []
  if (typeof v === 'number') {
    for (let i = 0; i < data.length; i++) {
      res[i] = data[i] + v
    }
    return res
  } else if (v && v.length && typeof v[0] === 'number') {
    if (data.length !== v.length) {
      throw new Error(`the length of data must equals to v`)
    }
    for (let i = 0; i < data.length; i++) {
      res[i] = data[i] + v[i]
    }
    return res
  } else {
    throw new Error(`typeof v must be number|number[]`)
  }
}

/**
 * macd
 * @param data
 * @param nShort
 * @param nLong
 * @param nDif
 */
export function macd(
  data: number[],
  nShort: number,
  nLong: number,
  nDif: number
): number[] {
  const emaShort = ema(data, nShort)
  const emaLong = ema(data, nLong)
  const difSL = dif(emaShort, emaLong)
  const dea = ema(difSL, nDif)
  return multiply(dif(difSL, dea), 2)
}

/**
 * normalize data to [low, high]
 * @param data
 * @param low
 * @param high
 */
export function normalize(data: number[], low: number, high: number): number[] {
  const minVal = lodash.min(data)!
  const maxVal = lodash.max(data)!
  const width = maxVal - minVal
  const widthTransform = high - low
  const res: number[] = []
  for (let i = 0; i < data.length; i++) {
    res[i] = ((data[i] - minVal) / width) * widthTransform + low
  }
  return res
}

/**
 * round float
 * @param data
 * @param n
 */
export function round(data: number, n: number): number {
  const times = Math.pow(10, n)
  return Math.round(data * times) / times
}

/**
 * calculate stock brokerage
 * @param exchangeType
 * @param amount
 * @param price
 */
export function brokerage(
  exchangeType: 'buy' | 'sell',
  amount: number,
  price: number
): number {
  const transactions = price * amount
  const stamp = exchangeType === 'sell' ? transactions * 0.001 : 0
  const transfer = transactions * 0.00002
  const brokerage = transactions * 0.0003 < 5 ? 5 : transactions * 0.0003
  return stamp + transfer + brokerage
}

/**
 * return the range between [start, end) with step
 * @param start
 * @param end
 * @param step
 */
export function range(start: number, end: number, step: number) {
  const res: number[] = []
  for (let i = start; i < end; i += step) {
    res.push(i)
  }
  return res
}

/**
 * multiply by position
 * @param {number[]} a1
 * @param {number[]} a2
 * @return {number}
 */
export function dotMultiply(a1: number[], a2: number[]): number {
  let res = 0
  if (a1.length !== a2.length) {
    throw new Error(`the length of a1 and d2 must be equal`)
  }
  for (let i = 0; i < a1.length; i++) res += a1[i] * a2[i]
  return res
}

/**
 * calculate variance of data
 * @param {number[]} data
 * @return {number}
 */
export function variance(data: number[]): number {
  const meanVal = mean(data)
  const dif = add(data, -meanVal)
  return dotMultiply(dif, dif) / (data.length - 1)
}

/**
 * calculate standard deviation of data
 * @param {number[]} data
 * @return {number}
 */
export function std(data: number[]): number {
  return Math.sqrt(variance(data))
}

/**
 * corvation of a1 and a2
 * @param {number[]} a1
 * @param {number[]} a2
 * @return {number}
 */
export function covariance(a1: number[], a2: number[]): number {
  if (a1.length !== a2.length)
    throw new Error(`the length of a1 and a2 must be equal`)
  return dotMultiply(add(a1, -mean(a1)), add(a2, -mean(a2))) / (a1.length - 1)
}

/**
 * calculate the correlation of a1 and a2
 * @param {number[]} a1
 * @param {number[]} a2
 * @return {number}
 */
export function correlation(a1: number[], a2: number[]): number {
  const std1 = std(a1)
  const std2 = std(a2)
  if (std1 > 0 && std2 > 0) {
    return covariance(a1, a2) / (std1 * std2)
  } else return 0
}

/**
 * calculate r square of label and predictLabel
 * @param {number[]} label
 * @param {number[]} predictLabel
 * @return {number}
 */
export function r2(label: number[], predictLabel: number[]): number {
  const r = dif(predictLabel, label)
  const m = add(label, -mean(label))
  const residualSum = dotMultiply(r, r)
  const labelMeanDifSum = dotMultiply(m, m)
  return 1 - residualSum / labelMeanDifSum
}

/**
 * judge whether a and b is closeable
 * @param {number} a
 * @param {number} b
 * @param {number} tolerance
 * @return {boolean}
 */
export const isCloseable = (a: number, b: number, tolerance?: number) => {
  if (!tolerance) tolerance = 0.01
  return Math.abs(a - b) < tolerance
}

/**
 * convert num to binary number
 * @param {number} num
 * @param {number} bitLen
 * @return {number[]}
 */
export const toBNumber = (num: number, bitLen: number): number[] => {
  const bNumArray = []
  let div = Math.abs(num)
  while (true) {
    const left = div % 2
    div = (div - left) / 2
    bNumArray.push(left)
    if (div === 0) break
  }
  if (bitLen < bNumArray.length)
    throw new Error(
      `the length of binary value of ${num} is ${bNumArray.length}, which is bigger than ${bitLen}`
    )
  const left = bitLen - bNumArray.length
  for (let i = 0; i < left; i++) bNumArray.push(0)
  return bNumArray.reverse()
}

/**
 * convert color num to hex number array
 * @param {number} num
 * @return {number[]}
 */
export const convertColorToHexNumberArray = (num: number): number[] => {
  const res = [] as number[]
  let div = num
  for (;;) {
    const leftNum = div % 16
    div = (div - leftNum) / 16
    res.push(leftNum)
    if (div === 0) break
  }
  while (res.length < 6) {
    res.push(0)
  }
  return res.reverse()
}

/**
 * convert color num to hex char array
 * @param {number} num
 * @return {string[]}
 */
export const convertColorToHexCharArray = (num: number): string[] => {
  const charMap: {[index: number]: string} = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: 'a',
    11: 'b',
    12: 'c',
    13: 'd',
    14: 'e',
    15: 'f'
  }
  const nums = convertColorToHexNumberArray(num)
  const res = [] as string[]
  for (let num of nums) {
    res.push(charMap[num])
  }
  return res
}

/**
 * parse hex string into number, return NaN if parse num failed
 * @param {string} num
 * @return {number}
 */
export const parseHexColorToNumber = (num: string): number => {
  num = num.toLowerCase().trim()
  const pattern = /^0x([a-f]|\d){6}$/
  if (!pattern.test(num)) {
    return NaN
  }
  const charMap: {[index: string]: number} = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'a': 10,
    'b': 11,
    'c': 12,
    'd': 13,
    'e': 14,
    'f': 15
  }
  num = num.slice(2)
  let value = 0
  for (let i=0; i<6; i++) {
    const c = num[5-i]
    value += charMap[c] * Math.pow(16, i)
  }
  return value
}
