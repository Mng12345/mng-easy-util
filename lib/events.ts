// event communication between components

export type Handler = (...args: any[]) => void
export type AsyncHandler = (...args: any[]) => Promise<void>

export class Observer {
  private handlers: { [index: string]: (Handler | AsyncHandler)[] } = {}

  constructor() {}

  on(event: string, fn: Handler | AsyncHandler) {
    let handlers = this.handlers[event]
    if (handlers === undefined) {
      handlers = []
    }
    handlers.push(fn)
    this.handlers[event] = handlers
  }

  fire(event: string, ...args: any[]) {
    const handlers = this.handlers[event]
    if (handlers !== undefined) {
      handlers.forEach((handler) => {
        handler(...args)
      })
    }
  }

  async fireAsync(event: string, ...args: any[]) {
    const handlers = this.handlers[event]
    if (handlers !== undefined) {
      for (let handler of handlers) {
        await handler(...args)
      }
    }
  }

  free({event, handler}: {
    event?: string,
    handler?: Handler | AsyncHandler
  }) {
    if (event === undefined) { // free all
      this.handlers = {}
      return
    } else {
      if (this.handlers[event] === undefined) return;
      if (handler === undefined) { // free event all
        this.handlers[event] = []
      } else { // free event with single handler
        const handlers = this.handlers[event]
        const index = handlers.indexOf(handler)
        if (index !== undefined) {
          handlers.splice(index, 1)
          this.handlers[event] = handlers
        }
      }
    }
  }
}
