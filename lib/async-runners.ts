// async runner utils

import {sleep} from "./file";

/**
 * @deprecated
 */
export interface RunnerI<T> {
  status: 'pending' | 'done' | 'reject' | 'init'

  run(...args: any[]): Promise<T>

  init(): Promise<void>

  wait(
    timeout: number
  ): Promise<void> /**wait runner to completed with timeout*/
}

/**
 * @deprecated
 */
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
 * @deprecated
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
 * @deprecated
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

export type RunnerFunc<T> = () => Promise<T>

/**
 * AsyncRunners for easy use
 */
export class AsyncRunner<T> {

  private status: 'init' | 'running' | 'stopped' | 'stopping' = 'init'
  private calledReset = false
  result: T[] = []

  constructor(public batch: number, public runners: RunnerFunc<T>[]) {
  }

  async reset() {
    if (this.calledReset) return
    this.calledReset = true
    if (this.status === 'running') {
      await this.stop()
    } else if (this.status === 'stopping') {
      // async wait for status to be 'stopped'
      // @ts-ignore
      while (this.status !== 'stopped') {
        await sleep(10)
      }
    }
    this.runners = []
    this.result = []
    this.status = 'init'
  }

  add(...runner: RunnerFunc<T>[]) {
    this.runners.push(...runner)
    return this
  }

  async stop() {
    this.status = 'stopping'
    while (this.status === 'stopping') {
      await sleep(10)
    }
  }

  async run(): Promise<T[]> {
    this.status = 'running'
    let unitRunners: RunnerFunc<T>[] = []
    while (this.runners.length > 0) {
      // @ts-ignore
      if (this.status === 'stopping') {
        break
      }
      if (unitRunners.length < this.batch) {
        const headRunner = this.runners.shift()!
        unitRunners.push(headRunner)
      } else {
        const unitResult = await Promise.all(unitRunners.map(runner => runner()))
        this.result.push(...unitResult)
        unitRunners = []
      }
    }
    if (unitRunners.length > 0 && this.status === 'running') {
      const unitResult = await Promise.all(unitRunners.map(runner => runner()))
      this.result.push(...unitResult)
    }
    this.status = 'stopped'
    return this.result
  }
}

