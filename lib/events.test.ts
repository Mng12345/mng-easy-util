import { Observer } from './events'
import { sleep } from './sleep'
import { copyFunc } from './func-util'

test('on & fire', () => {
  const observer = new Observer()
  observer.on('event1', () => {
    console.log(`fire event1`)
  })
  observer.on('event1', () => {
    console.log(`fire event1 again`)
  })
  observer.on('event2', () => {
    console.log(`fire event2`)
  })
  observer.on('event2', function () {
    console.log(`fire event2 with args: ${JSON.stringify(arguments)}`)
  })
  observer.fire('event1')
  observer.fire('event2')
  observer.fire('event2', 'a', 'b', 'c')
})

test('fire & fireAsync', async () => {
  const observer = new Observer()
  observer.on('fire async and sync events', () => {
    console.log(`fire sync event1`)
  })
  observer.on('fire async and sync events', () => {
    console.log(`fire sync event2`)
  })
  observer.on('fire async and sync events', async () => {
    await sleep(1000)
    console.log(`fire async event3`)
  })
  observer.on('fire async and sync events', () => {
    console.log(`fire sync event4`)
  })
  observer.on('fire async and sync events', async () => {
    await sleep(1000)
    console.log(`fire async event5`)
  })
  // console.log(`test fire events`)
  // observer.fire('fire async and sync events')
  // console.log(`test fireAsync events`)
  await observer.fireAsync('fire async and sync events')
}, 10000)

test('free', () => {
  const observer = new Observer()
  const handler = () => console.log(`on fire handler`)
  const handler1 = copyFunc(handler)
  observer.on('event1', handler)
  observer.on('event1', handler1)
  // observer.free({
  //   event: 'event1',
  //   handler
  // })
  // observer.fire('event1')
  // observer.free({
  //   event: 'event1',
  //   handler: handler1
  // })
  // observer.fire('event1')
  // observer.free({
  //   event: 'event1'
  // })
  observer.free({})
  observer.fire('event1')
})

test('priority', () => {
  const observer = new Observer()
  observer.on('test', () => {
    console.log(`event1`)
  })
  observer.on(
    'test',
    () => {
      console.log(`event2`)
    },
    2
  )
  observer.on(
    'test',
    () => {
      console.log(`event3`)
    },
    1
  )
  observer.fire('test')
})
