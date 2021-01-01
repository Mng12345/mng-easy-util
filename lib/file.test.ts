import { sleep } from './file'
import * as fs from 'fs'
import * as path from 'path'

test('sleep', async () => {
  const timeStart = new Date().getTime()
  await sleep(1000)
  const timeEnd = new Date().getTime()
  expect(timeEnd - timeStart > 1000).toBe(true)
})
