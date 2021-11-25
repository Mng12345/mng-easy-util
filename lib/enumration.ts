export class Enumration<T> {
  private value: T
  constructor(value: T) {
    this.value = value
  }
  get(): T {
    return this.value
  }
}
