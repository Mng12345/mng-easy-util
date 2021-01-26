function isArrayLike(data: any): data is ArrayLike<any> {
  return data.length
}

export class Stream<T> {
  iterator: IterableIterator<T>

  constructor(data: ArrayLike<T> | IterableIterator<T>) {
    if (isArrayLike(data)) {
      let index = 0
      this.iterator = new (class implements IterableIterator<T> {
        next(): IteratorResult<T, any> {
          const value = data[index]
          if (index < data.length) {
            index++
            return {
              done: false,
              value,
            }
          } else {
            return {
              done: true,
              value,
            }
          }
        }
        [Symbol.iterator](): IterableIterator<T> {
          return this
        }
      })()
    } else {
      this.iterator = data
    }
  }

  static of<T>(data: ArrayLike<T> | IterableIterator<T>): Stream<T> {
    return new Stream<T>(data)
  }

  each(callback: (item: T, index?: number) => void): void {
    let index = 0
    for (const item of this.iterator) {
      callback(item, index++)
    }
  }

  forEach(callback: (item: T, index?: number) => void): void {
    this.each(callback)
  }

  map<R>(callback: (item: T, index?: number) => R): Stream<R> {
    let index = 0
    const outThis = this
    const itor = new (class implements IterableIterator<R> {
      [Symbol.iterator](): IterableIterator<R> {
        return this
      }

      next(): IteratorResult<R, R> {
        const value = outThis.iterator.next()
        let res: R | undefined = undefined
        if (!value.done) {
          res = callback(value.value, index++)
        }
        return {
          done: value.done,
          value: res as R,
        }
      }
    })()
    return new Stream<R>(itor)
  }

  flatMap<R>(callback: (item: T, index?: number) => R[]): Stream<R> {
    let index = 0
    const outThis = this
    let currentValue = { done: false, value: [] } as {
      done?: boolean
      value: R[]
    }
    const iterator = new (class implements IterableIterator<R | undefined> {
      [Symbol.iterator](): IterableIterator<R | undefined> {
        return this
      }
      next(): IteratorResult<R | undefined, R | undefined> {
        if (currentValue.value.length > 0) { // already read a value from the result which is parsed from out iterator and the left result.length > 1
          const value = currentValue.value.shift()!
          return {
            done: false,
            value
          }
        } else {
          const value = outThis.iterator.next() // second branch read a value from out iterator
          if (value.done) { // the out iterator is empty
            return {
              done: true,
              value: undefined
            }
          }
          // get result from out iterator
          currentValue = {
            value: [...callback(value.value, index++)],
            done: value.done,
          }
          if (currentValue.value.length === 0) { // current result from out iterator is [], go to the second branch again
            return {
              done: false,
              value: undefined
            }
          } else { // current result.length > 1, shift one element, go to the first branch
            return {
              done: false,
              value: currentValue.value.shift()!
            }
          }
        }
      }
    })()
    // genius work!
    return new Stream(iterator).filter((item) => item !== undefined) as Stream<R>
  }

  filter(callback: (item: T, index?: number) => boolean): Stream<T> {
    let index = 0
    const outThis = this
    const itor = new (class implements IterableIterator<T> {
      [Symbol.iterator](): IterableIterator<T> {
        return this
      }

      next(): IteratorResult<T, T> {
        let valueFiltered: IteratorResult<T, T>
        while (true) {
          const value = outThis.iterator.next()
          valueFiltered = value
          if (value.done) {
            // iterator done
            valueFiltered = value
            break
          } else {
            // check filter
            if (callback(value.value, index++)) {
              valueFiltered = value
              break
            }
          }
        }
        return valueFiltered
      }
    })()
    return new Stream<T>(itor)
  }

  collect(): T[] {
    const res: T[] = []
    for (let item of this.iterator) {
      res.push(item)
    }
    return res
  }

  groupBy<K extends string | number, R extends [K, T[]]>(
    callback: (item: T, index?: number) => K
  ): DictionaryStream<K, T> {
    const result = {} as { [index in K]: T[] }
    const keys: K[] = []
    this.each((item, index) => {
      const key = callback(item, index)
      const value = result[key]
      if (value) {
        value.push(item)
      } else {
        result[key] = [item]
        keys.push(key)
      }
    })
    return new DictionaryStream<K, T>(
      Stream.of(keys).map((key) => {
        const value: [K, T[]] = [key, result[key]]
        return value
      }) as Stream<R>
    )
  }
}

export class DictionaryStream<K extends number | string, T> extends Stream<
  [K, T[]]
> {
  constructor(stream: Stream<[K, T[]]>) {
    super(stream.iterator)
  }

  toDict() {
    const result = {} as { [index in K]: T[] }
    this.each((item) => {
      result[item[0]] = item[1]
    })
    return result
  }
}
