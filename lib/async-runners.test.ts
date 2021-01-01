import { getAvailableRunners, runBatch, Runner, RunnerI } from './async-runners'
import { sleep } from './file'
import { Stream } from './stream'
import { range } from './math'

test('runBatch & getAvailableRunners', async () => {
  const runners: RunnerI<void>[] = [
    new Runner<void>(
      async () => {
        return await sleep(1000)
      },
      async () => {}
    ),
    new Runner<void>(
      async () => {
        return await sleep(1000)
      },
      async () => {}
    ),
    new Runner<void>(
      async () => {
        return await sleep(1000)
      },
      async () => {}
    ),
    new Runner<void>(
      async () => {
        return await sleep(1000)
      },
      async () => {}
    ),
    new Runner<void>(
      async () => {
        return await sleep(1000)
      },
      async () => {}
    ),
  ]
  const timeStart = new Date().getTime()
  await runBatch(2, runners)
  const timeEnd = new Date().getTime()
  console.log(`time use: ${timeEnd - timeStart}`)
  expect(timeEnd - timeStart < 5000).toBe(true)
  // restore the status of all runners
  await Promise.all(runners.map((runner) => runner.init()))
  // let the runner run at least 2 seconds
  runBatch(2, runners).catch((err) => console.log(err))
  expect(
    await (async () => {
      const timeStart = new Date().getTime()
      try {
        await getAvailableRunners(runners, 5, 1000)
        return true
      } catch (e) {
        console.log(e)
        const timeEnd = new Date().getTime()
        console.log(
          `get available runners failed with in 1000ms, time used: ${
            timeEnd - timeStart
          }`
        )
        return false
      }
    })()
  ).toBe(false)
  expect(
    await (async () => {
      try {
        const timeStart = new Date().getTime()
        await getAvailableRunners(runners, 2, 1000)
        const timeEnd = new Date().getTime()
        console.log(
          `get available runners time used: ${
            timeEnd - timeStart
          }, with in 1000ms`
        )
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    })()
  ).toBe(true)
})

test('runBatch', () => {
  ;(async () => {
    const runners = Stream.of(range(0, 10, 1))
      .map((i) => {
        return new Runner(
          async () => {
            console.log(`i: `, i)
            await sleep(10)
          },
          async () => {}
        )
      })
      .collect()
    await runBatch(2, runners)
  })().catch((err) => console.log(err))
})
