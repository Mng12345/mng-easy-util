// event communication between components

export type Handler = (...args: any[]) => void

export class Observer {
  private handlers: { [index: string]: Handler[] } = {}

  constructor() {}

  on(event: string, fn: Handler) {
    let handlers = this.handlers[event]
    if (handlers === undefined) {
      handlers = []
    }
    handlers.push(fn)
    this.handlers[event] = handlers
  }

  fire(event: string, ...args: any[]) {
    const handlers = this.handlers[event]
    if (handlers !== undefined && handlers.length > 0) {
      handlers.forEach((handler) => handler(...args))
    }
  }
}
