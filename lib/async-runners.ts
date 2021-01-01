// async runner utils

export interface RunnerI<T> {
  status: 'pending' | 'done' | 'reject' | 'init'

  run(...args: any[]): Promise<T>

  init(): Promise<void>

  wait(
    timeout: number
  ): Promise<void> /**wait runner to completed with timeout*/
}

export class Runner<T> implements RunnerI<T> {
  status: 'pending' | 'done' | 'reject' | 'init' = 'init'

  constructor(
    public runHook: () => Promise<T>,
    public initHook: () => Promise<void>
  ) {}

  async run(...args: any[]): Promise<T> {
    this.status = 'pending'
    try {
      const result = await this.runHook()
      this.status = 'done'
      return result
    } catch (e) {
      this.status = 'reject'
      return Promise.reject(e)
    }
  }

  async init(): Promise<void> {
    this.status = 'init'
    await this.initHook()
  }

  async wait(timeout: number): Promise<void> {
    const startTime = new Date().getTime()
    return new Promise((resolve, reject) => {
      // wait runner completed
      const waitTimeout = () => {
        const endTime = new Date().getTime()
        if (endTime - startTime > timeout) {
          reject(
            `failed to restore runner with timeout: ${endTime - startTime}ms`
          )
          return
        }
        if (this.status === 'done') {
          resolve()
          return
        } else {
          setTimeout(waitTimeout, 10)
        }
      }
      waitTimeout()
    })
  }
}

/**
 * async run the runners with batch
 * @template T
 * @param {number} batch
 * @param {RunnerI<T>[]} runners
 * @return {Promise<T[]>}
 */
export const runBatch = async <T>(batch: number, runners: RunnerI<T>[]) => {
  if (runners.find((runner) => runner.status !== 'init')) {
    throw new Error(`the status of each runners must be 'init' before runBatch`)
  }
  let runnerBatch: RunnerI<T>[] = []
  const runnerResults: T[] = []
  for (let i = 0; i < runners.length; i++) {
    if (runnerBatch.length < batch) {
      runnerBatch.push(runners[i])
    } else {
      const batchResult = await Promise.all(
        runnerBatch.map((runner) => runner.run())
      )
      runnerResults.push(...batchResult)
      runnerBatch = [runners[i]]
    }
  }
  if (runnerBatch.length !== 0) {
    const batchResult = await Promise.all(
      runnerBatch.map((runner) => runner.run())
    )
    runnerResults.push(...batchResult)
  }
  return runnerResults
}

/**
 * get num available runners within timeout ms
 * @template T
 * @param {RunnerI<T>[]} runners
 * @param {number} num
 * @param {number} timeout
 */
export const getAvailableRunners = async <T>(
  runners: RunnerI<T>[],
  num: number,
  timeout: number
) => {
  if (num > runners.length) {
    throw new Error(
      `can not get more than the length of runners available runners`
    )
  }
  return new Promise<RunnerI<T>[]>((resolve, reject) => {
    const startTime = new Date().getTime()
    const deltaTime = 10
    const getRunners = () => {
      const endTime = new Date().getTime()
      if (endTime - startTime > timeout) {
        reject(`getting ${num} runners with timeout: ${timeout}ms`)
        return
      }
      const completedRunners = runners.filter(
        (runner) => runner.status === 'done'
      )
      if (completedRunners.length >= num) {
        resolve(completedRunners.slice(0, num))
      } else {
        setTimeout(getRunners, deltaTime)
      }
    }
    getRunners()
  })
}
