import { HashMap } from './hashmap'

/**
 * utils for limiting func call once, call func called count
 */
export class FuncClassTrace {
  private static trace: HashMap<string, number> = new HashMap<string, number>()

  static getCalledCount(name: string): number {
    if (!FuncClassTrace.trace.has(name)) {
      return 0
    }
    return FuncClassTrace.trace.get(name)!
  }

  static doOneTime(func: () => void, name: string) {
    if (FuncClassTrace.trace.has(name)) {
      return
    } else {
      func()
      FuncClassTrace.trace.set(name, 1)
    }
  }

  static clear(name?: string) {
    if (name) {
      FuncClassTrace.trace.delete(name)
    } else {
      FuncClassTrace.trace.clear()
    }
  }

  static callCount(func: () => void, name: string) {
    func()
    if (FuncClassTrace.trace.has(name)) {
      FuncClassTrace.trace.set(name, FuncClassTrace.trace.get(name)! + 1)
    } else {
      FuncClassTrace.trace.set(name, 1)
    }
  }
}
