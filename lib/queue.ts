import {LinkedNode} from "./algorithm/linked";

export interface Queue<T> {
  size: number
  add(value: T): void
  take(): T | null
}

export class SimpleQueue<T> implements Queue<T> {
  size: number = 0;
  head: LinkedNode<T> | null = null
  tail: LinkedNode<T> | null = null
  constructor() {
  }

  add(value: T): void {
    const node = new LinkedNode(value)
    if (this.head === null) {
      this.head = node
      this.tail = node
    } else {
      this.tail!.addNode(node)
      this.tail = node
    }
    this.size++
  }

  take(): T | null {
    if (this.head === null)
      return null
    const head = this.head!
    const nextHead = head.next
    head.remove()
    this.head = nextHead
    if (this.size > 0)
      this.size--
    return head.value
  }

}
