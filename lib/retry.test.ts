import { sleep } from './sleep'
import { retry } from './retry'

test('retry1', async () => {
  const f1 = async () => {
    await sleep(500)
    return 1
  }
  const fRetry1 = retry({
    func: f1,
    times: 3,
    errCb: (e) => console.log(e),
    isAsync: true,
  })
  const res1 = await fRetry1()
  expect(res1).toBe(1)
  const f2 = async () => {
    await sleep(500)
    throw `err`
  }
  const fRetry2 = retry({
    func: f2,
    times: 3,
    errCb: (e) => console.log(`retrying...`),
    isAsync: true,
  })
  try {
    const res2 = await fRetry2()
  } catch (e) {
    console.log(e)
  }
  const f3 = async (a: number) => {
    await sleep(500)
    return a + 1
  }
  const fRetry3 = retry({
    func: f3,
    times: 3,
    errCb: (e) => console.log(e),
    isAsync: true,
  })
  const res3 = await fRetry3(3)
  expect(res3).toBe(4)
}, 3000)

test('retry2', () => {
  const f1 = () => {
    return 1
  }
  const fRetry1 = retry({
    func: f1,
    times: 3,
    errCb: (e) => console.log(e),
  })
  const res1 = fRetry1()
  expect(res1).toBe(1)
  const f2 = () => {
    throw `err`
  }
  const fRetry2 = retry({
    func: f2,
    times: 3,
    errCb: (e) => console.log(`retrying...`),
  })
  try {
    const res2 = fRetry2()
  } catch (e) {
    console.log(e)
  }
  const f3 = (a: number) => {
    return a + 1
  }
  const fRetry3 = retry({
    func: f3,
    times: 3,
    errCb: (e) => console.log(e),
  })
  const res3 = fRetry3(3)
  expect(res3).toBe(4)
}, 3000)
