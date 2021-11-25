import { sleep } from './sleep'
import { promisify, withTimeout } from './promise'

test('withTimeout', async () => {
  const makePromise = async (): Promise<number> => {
    await sleep(5000)
    return 1
  }
  const promiseWithTimeout = withTimeout(makePromise(), 6000)
  try {
    const num = await promiseWithTimeout
    console.log(`promise returned:`, num)
  } catch (e) {
    console.log(e)
  }
}, 10000)

test('promise', async () => {
  const f1 = () => 1
  const f2 = () => Promise.resolve(1)
  const f3 = async () => {
    await sleep(1000)
    return 1
  }
  const pf1 = promisify(f1)
  const pf2 = promisify(f2)
  const pf3 = promisify(f3)
  const r1 = await pf1()
  const r2 = await pf2()
  const r3 = await pf3()
  expect(r1).toBe(1)
  expect(r2).toBe(1)
  expect(r3).toBe(1)
}, 3000)
