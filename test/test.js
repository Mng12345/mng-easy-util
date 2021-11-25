import { WorkerInfo, WorkerPool } from '../dist/cjs/worker-pool.js'

function createWorker() {
  return new Worker(new URL('./worker-pool.test.worker.js', import.meta.url))
}

const workerInfos = [
  {
    worker: createWorker(),
    createFunc: createWorker,
  },
  {
    worker: createWorker(),
    createFunc: createWorker,
  },
  {
    worker: createWorker(),
    createFunc: createWorker,
  },
  {
    worker: createWorker(),
    createFunc: createWorker,
  },
  {
    worker: createWorker(),
    createFunc: createWorker,
  },
]

const pool = new WorkerPool(5, workerInfos)
for (let i = 0; i < 10; i++) {
  const data = new Uint8Array(10)
  pool.submitTransfer(data.buffer, [data.buffer])
}
pool.wait().then((data) => {
  console.log(`data:`, data)
})
