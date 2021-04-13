export function retry<R>(options: {func: () => R, times: number, errCb?: (e: any) => void, isAsync?: boolean}): () => R
export function retry<T, R>(options: {func: (t: T) => R, times: number, errCb?: (e: any) => void, isAsync?: boolean}): (t: T) => R
export function retry<T1, T2, R>(options: {func: (t1: T1, t2: T2) => R, times: number, errCb?: (e: any) => void, isAsync?: boolean}): (t1: T1, t2: T2) => R
export function retry<T1, T2, T3, R>(options: {func: (t1: T1, t2: T2, t3: T3) => R, times: number, errCb?: (e: any) => void, isAsync?: boolean}): (t1: T1, t2: T2, t3: T3) => R
export function retry<T1, T2, T3, T4, R>(options: {func: (t1: T1, t2: T2, t3: T3, t4: T4) => R, times: number, errCb?: (e: any) => void, isAsync?: boolean}): (t1: T1, t2: T2, t3: T3, t4: T4) => R
export function retry({func, times, errCb=(e: any) => {}, isAsync=false}: {func: (...args: any[]) => any, times: number, errCb?: (e: any) => void, isAsync?: boolean}) {
  if (isAsync) {
    return async (...args: any[]) => {
      for (let i=0; i<times; i++) {
        try {
          return await func(...args)
        } catch (e) {
          errCb(e)
        }
      }
    }
  } else {
    return (...args: any[]) => {
      for (let i=0; i<times; i++) {
        try {
          return func(...args)
        } catch (e) {
          errCb(e)
        }
      }
    }
  }
}
