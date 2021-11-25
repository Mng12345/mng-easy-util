const { sleep } = require('mng-easy-util/file')
const { parentPort } = require('worker_threads')

parentPort.addEventListener('message', async (ev) => {
  console.log(`in worker, received data: `, ev.data)
  parentPort.postMessage(ev.data, [ev.data])
})
