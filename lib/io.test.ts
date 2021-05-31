import {LineReader} from "./io";

test('read', async () => {
  const reader = new LineReader('./lib/io.ts')
  for (;;) {
    const line = await reader.read()
    if (line === null) break
    if (line.trim() === '') continue
    console.log(`line: ${line}`)
  }
}, 10000)
