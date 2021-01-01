import { basic, HashCode, isBasic, Key } from './hashmap'

export class HashSet<K extends Key> implements Set<K> {
  private hashCodeSet: Set<basic> = new Set<basic>()
  private hashCodeObjMap: Map<basic, K> = new Map<string, K>()

  constructor() {
    this.size = this.hashCodeSet.size
  }

  [Symbol.iterator](): IterableIterator<K> {
    return this.hashCodeObjMap.values()
  }

  entries(): IterableIterator<[K, K]> {
    const valueIterator = this.hashCodeObjMap.values()
    return new (class implements IterableIterator<[K, K]> {
      next(): IteratorResult<[K, K], any> {
        const value = valueIterator.next()
        return {
          done: value.done,
          value: [value.value, value.value],
        }
      }

      [Symbol.iterator](): IterableIterator<[K, K]> {
        return this
      }
    })()
  }

  keys(): IterableIterator<K> {
    return this.hashCodeObjMap.values()
  }

  values(): IterableIterator<K> {
    return this.hashCodeObjMap.values()
  }

  [Symbol.toStringTag]: string

  size: number

  hashCode(obj: K): basic {
    if (isBasic(obj)) {
      return obj
    } else {
      return (obj as HashCode).hashCode()
    }
  }

  add(value: K): this {
    let code = this.hashCode(value)
    this.hashCodeSet.add(code)
    this.hashCodeObjMap.set(code, value)
    this.size = this.hashCodeSet.size
    return this
  }

  clear(): void {
    this.hashCodeSet.clear()
    this.hashCodeObjMap.clear()
    this.size = this.hashCodeSet.size
  }

  delete(value: K): boolean {
    const code = this.hashCode(value)
    const flag = this.hashCodeSet.delete(code)
    this.hashCodeObjMap.delete(code)
    this.size = this.hashCodeSet.size
    return flag
  }

  forEach(
    callbackfn: (value: K, value2: K, set: Set<K>) => void,
    thisArg?: any
  ): void {
    this.hashCodeObjMap.forEach((value, key, map) => {
      callbackfn(value, value, this)
    })
  }

  has(value: K): boolean {
    return this.hashCodeSet.has(this.hashCode(value))
  }
}
