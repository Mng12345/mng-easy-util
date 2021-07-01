// test for co

import { AsyncPool } from './co'
import { sleep } from './file'

test('AsyncPool', async () => {
  const pool = new AsyncPool<number>(3)
  console.time()
  pool.push(async () => {
    await sleep(300)
    return 1
  }, 'task-1')
  pool.push(async () => {
    await sleep(800)
    return 2
  }, 'task-2')
  pool.push(async () => {
    await sleep(400)
    return 3
  }, 'task-3')
  pool.push(async () => {
    await sleep(300)
    return 4
  }, 'task-4')
  pool.push(async () => {
    await sleep(12000)
    throw 'error'
  }, 'task-5')
  await pool.wait()
  console.timeEnd()
  console.log(`result:`, pool.resultMap)
}, 28000)
