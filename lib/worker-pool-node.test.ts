import { WorkerPool } from './worker-pool-node'
test('woker-pool-node', async () => {
  const workerPool = new WorkerPool(4, './lib/worker-pool-node.test.worker.js')
  const promises: Promise<ArrayBuffer>[] = []
  for (let i = 0; i < 10; i++) {
    const data = new Uint8Array(10)
    const promise = workerPool.submitTransfer<ArrayBuffer, ArrayBuffer>(
      data.buffer,
      [data.buffer]
    )
    promises.push(promise)
  }
  const data = await workerPool.wait<ArrayBuffer>()
  console.log(`data:`, data)
  // const data = await Promise.all(promises)
  // console.log(`data: `, data)
}, 10000)
