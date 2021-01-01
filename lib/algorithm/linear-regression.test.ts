import { range } from '../math'
import { Stream } from '../stream'
import { fit, Options } from './linear-regression'

test('linear-regression', () => {
  // y = 0.3x + 0.5
  const simulationF = (x: number) => {
    return 0.3 * x + 0.5 + Math.random() * 0.1
  }
  const x = Stream.of(range(0, 100, 1))
    .map((item) => [item])
    .collect()
  const y = Stream.of(x)
    .map((item) => simulationF(item[0]))
    .collect()
  const options: Options = {
    x,
    y,
    initValues: [0.2, 13],
    maxIterations: 2000,
    tolerance: 0.0001,
  }
  const params = fit(options)
  console.log(`params:`, params)
})
