export class Option<T> {
  private value: T | null = null
  private constructor(v: T | null) {
    this.value = v
  }

  static of<T>(v: T): Option<T> {
    return new Option(v)
  }

  static empty<T>(): Option<T> {
    return new Option<T>(null)
  }

  expect(info: string): T {
    if (this.value === null) {
      throw new Error(info)
    } else {
      return this.value
    }
  }

  unwrap(): T {
    return this.expect(`the value is null`)
  }

  get(): T | null {
    return this.value
  }

  isEmpty(): boolean {
    return this.value === null
  }

  hasValue(): boolean {
    return this.value !== null
  }
}
