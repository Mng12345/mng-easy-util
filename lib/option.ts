export class Option<T> {
  constructor(public value: T | undefined | null) {}
  hasValue(): boolean {
    return this.value !== undefined && this.value !== null
  }
}
