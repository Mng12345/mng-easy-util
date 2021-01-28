// event communication between components

import lodash from "lodash";

export type Handler = (...args: any[]) => void
export type AsyncHandler = (...args: any[]) => Promise<void>

export class Observer {
  private handlers: { [index: string]: {fn: Handler | AsyncHandler, priority: number}[] } = {}

  constructor() {}

  on(event: string, fn: Handler | AsyncHandler, priority: number = 0) {
    let handlers = this.handlers[event]
    if (handlers === undefined) {
      handlers = []
    }
    handlers.push({fn, priority})
    this.handlers[event] = handlers
  }

  fire(event: string, ...args: any[]) {
    let handlers = this.handlers[event]
    if (handlers === undefined) return
    // sort by priority
    handlers = lodash.sortBy(handlers, handler => handler.priority)
    handlers.forEach((handler) => {
      handler.fn(...args)
    })
  }

  async fireAsync(event: string, ...args: any[]) {
    let handlers = this.handlers[event]
    if (handlers === undefined) return
    handlers = lodash.sortBy(handlers, handler => handler.priority)
    for (let handler of handlers) {
      await handler.fn(...args)
    }
  }

  free({event, handler, priority}: {
    event?: string,
    handler?: Handler | AsyncHandler
    priority?: number
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
        if (priority === undefined) {
          const newHandlers: {fn: Handler | AsyncHandler, priority: number}[] = []
          for (let i=0; i<handlers.length; i++) {
            if (handlers[i].fn !== handler) {
              newHandlers.push(handlers[i])
            }
          }
          this.handlers[event] = newHandlers
        } else {
          const newHandlers: {fn: Handler | AsyncHandler, priority: number}[] = []
          for (let i=0; i<handlers.length; i++) {
            const item = handlers[i]
            if (item.fn !== handler || item.priority !== priority) {
              newHandlers.push(item)
            }
          }
          this.handlers[event] = newHandlers
        }
      }
    }
  }
}
