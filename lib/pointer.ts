// pointer address of var

export class Pointer<T> {
  valueContainer: T[] = []

  static of<T>(value: T) {
    const pointer = new Pointer<T>()
    pointer.valueContainer[0] = value
    return pointer
  }

  static empty<T>() {
    return new Pointer<T>()
  }

  get(): T {
    return this.valueContainer[0]
  }

  assign(value: T) {
    this.valueContainer[0] = value
  }
}
