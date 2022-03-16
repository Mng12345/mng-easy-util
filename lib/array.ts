export function map<T, R>(array: T[], callback: (item: T) => R): R[] {
  const length = array.length
  const result = new Array(length)
  for (let i = 0; i < length; i++) {
    result.push(callback(array[i]))
  }
  return result
}

export function mapWithIndex<T, R>(array: T[], callback: (item: T, index: number) => R): R[] {
  const length = array.length
  const result = new Array(length)
  for (let i = 0; i < length; i++) {
    result.push(callback(array[i], i))
  }
  return result
}

export function filter<T>(array: T[], callback: (item: T) => boolean): T[] {
  const result: T[] = []
  const length = array.length
  for (let i = 0; i < length; i++) {
    if (callback(array[i])) {
      result.push(array[i])
    }
  }
  return result
}

export function filterWithIndex<T>(array: T[], callback: (item: T, index: number) => boolean): T[] {
  const result: T[] = []
  const length = array.length 
  for (let i = 0; i < length; i++) {
    if (callback(array[i], i)) {
      result.push(array[i])
    }
  }
  return result
}

export function flatMap<T, R>(array: T[], callback: (item: T) => R[]): R[] {
  const length = array.length
  const result: R[] = []
  for (let i = 0; i < length; i++) {
    const currResult = callback(array[i])
    const currLength = currResult.length
    for (let j = 0; j < currLength; j++) {
      result.push(currResult[j])
    }
  }
  return result
}

