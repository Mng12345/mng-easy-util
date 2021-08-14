// make promise with timeout

export const withTimeout = async <T>(
  promise: Promise<T>,
  timeout: number
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    ;(async () => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        reject(`error with timeout: ${timeout}`)
      }, timeout)
      const t = await promise
      resolve(t)
    })().catch((err) => reject(err))
  })
}

export function promisify<R = void>(
  f: (() => R) | (() => Promise<R>)
): () => Promise<R>
export function promisify<R>(
  f: (() => R) | (() => Promise<R>)
): () => Promise<R>
export function promisify<T, R>(
  f: ((t: T) => R) | ((t: T) => Promise<R>)
): (t: T) => Promise<R>
export function promisify<T1, T2, R>(
  f: ((t1: T1, t2: T2) => R) | ((t1: T1, t2: T2) => Promise<R>)
): (t1: T1, t2: T2) => Promise<R>
export function promisify<T1, T2, T3, R>(
  f: ((t1: T1, t2: T2, t3: T3) => R) | ((t1: T1, t2: T2, t3: T3) => Promise<R>)
): (t1: T1, t2: T2, t3: T3) => Promise<R>
export function promisify<T1, T2, T3, T4, R>(
  f:
    | ((t1: T1, t2: T2, t3: T3, t4: T4) => R)
    | ((t1: T1, t2: T2, t3: T3, t4: T4) => Promise<R>)
): (t1: T1, t2: T2, t3: T3, t4: T4) => Promise<R>
export function promisify<T1, T2, T3, T4, T5, R>(
  f:
    | ((t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R)
    | ((t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => Promise<R>)
): (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => Promise<R>
export function promisify(
  f: ((...args: any[]) => any) | ((...args: any[]) => Promise<any>)
): (...args: any[]) => Promise<any> {
  return async (...args: any[]): Promise<any> => {
    return await f(...args)
  }
}
