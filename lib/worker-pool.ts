import { sleep } from './sleep'

export class SimpleWorker {
  worker: Worker
  status: 'buzy' | 'ready' | 'error' = 'ready'
  error: Error | null = null

  constructor(workerInfo: WorkerInfo) {
    this.worker = workerInfo.worker
  }

  async call<T, R>(message: T): Promise<R> {
    return await this.callTransfer(message, [])
  }

  async callTransfer<T, R>(message: T, transfers: ArrayBuffer[]): Promise<R> {
    this.status = 'buzy'
    return new Promise<R>((resolve, reject) => {
      this.worker.onmessage = (data: MessageEvent<R>) => {
        this.status = 'ready'
        resolve(data.data)
      }
      this.worker.postMessage(message, transfers)
    }).catch((err) => {
      this.status = 'error'
      this.error = err
      throw new Error(err)
    })
  }
}

export class WorkerInfo {
  worker: Worker
  createFunc: () => Worker
  constructor(worker: Worker, createFunc: () => Worker) {
    this.worker = worker
    this.createFunc = createFunc
  }
}

export class WorkerPool {
  readyPool: SimpleWorker[] = []
  errorPool: SimpleWorker[] = []
  size: number
  promises: Promise<any>[] = []
  allTaskNum: number = 0
  completedTaskNum: number = 0

  constructor(size: number, workerInfos: WorkerInfo[]) {
    this.size = size
    for (const workerInfo of workerInfos) {
      this.readyPool.push(new SimpleWorker(workerInfo))
    }
  }

  async submit<T, R>(message: T): Promise<R> {
    return await this.submitTransfer(message, [])
  }

  async submitTimeout<T, R>(message: T, timeout: number): Promise<R> {
    return await this.submitTransferTimeout(message, [], timeout)
  }

  async submitTransfer<T, R>(message: T, transfers: ArrayBuffer[]): Promise<R> {
    return await this.submitTransferTimeout(message, transfers, -1)
  }

  async submitTransferTimeout<T, R>(
    message: T,
    transfers: ArrayBuffer[],
    timeout: number
  ) {
    this.allTaskNum += 1
    let promise: Promise<R>
    if (timeout === -1) {
      promise = new Promise<R>(async (resolve, reject) => {
        if (this.readyPool.length === 0) {
          // waitting for ready pool
          for (;;) {
            await sleep(10)
            if (this.readyPool.length !== 0) {
              break
            }
          }
        }
        const worker = this.readyPool.shift()!
        try {
          const result = await worker.callTransfer<T, R>(message, transfers)
          this.readyPool.push(worker)
          this.completedTaskNum += 1
          resolve(result)
        } catch (e) {
          this.errorPool.push(worker)
        }
      })
    } else {
      promise = new Promise<R>(async (resolve, reject) => {
        if (this.readyPool.length === 0) {
          let currTime = 0
          const waitPerCycle = 10
          // waitting for ready pool
          for (;;) {
            await sleep(waitPerCycle)
            currTime += waitPerCycle
            if (currTime > timeout) {
              return reject(`submit timeout in ${timeout}`)
            }
            if (this.readyPool.length !== 0) {
              break
            }
          }
        }
        const worker = this.readyPool.shift()!
        try {
          const result = await worker.callTransfer<T, R>(message, transfers)
          console.log(`result:`, result)
          this.readyPool.push(worker)
          this.completedTaskNum += 1
          resolve(result)
        } catch (e) {
          this.errorPool.push(worker)
        }
      })
    }
    this.promises.push(promise)
    return await promise
  }

  async wait<R>() {
    return await Promise.all(this.promises)
  }
}
