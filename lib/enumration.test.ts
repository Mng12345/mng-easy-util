import { Enumration } from './enumration'
import { match } from './match'

test('enumration', function () {
  class Color extends Enumration<number> {
    static Red = new Color(1)
    static Green = new Color(2)
    static Blue = new Color(3)
  }

  function f(color: Color): string {
    return match<Color, string>(color, [
      [(c: Color) => c == Color.Red, (color: Color) => 'red'],
      [(c: Color) => c == Color.Green, (color: Color) => 'green'],
      [(c: Color) => c == Color.Blue, (color: Color) => 'blue'],
    ])
  }
  expect(f(Color.Red)).toBe('red')
  expect(f(Color.Blue)).toBe('blue')
  expect(f(Color.Green)).toBe('green')
  expect(Color.Red.get()).toBe(1)
})
