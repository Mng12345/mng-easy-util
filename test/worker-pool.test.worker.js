import { sleep } from '../dist/esm/file'

addEventListener('message', async (ev) => {
  console.log(`in worker, received data: `, ev.data)
  await sleep(1000)
  postMessage(ev.data, [ev.data])
})
