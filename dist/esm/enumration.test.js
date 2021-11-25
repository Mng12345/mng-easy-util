import { Enumration } from './enumration';
import { match } from './match';
test('enumration', function () {
    class Color extends Enumration {
    }
    Color.Red = new Color(1);
    Color.Green = new Color(2);
    Color.Blue = new Color(3);
    function f(color) {
        return match(color, [
            [(c) => c == Color.Red, (color) => 'red'],
            [(c) => c == Color.Green, (color) => 'green'],
            [(c) => c == Color.Blue, (color) => 'blue'],
        ]);
    }
    expect(f(Color.Red)).toBe('red');
    expect(f(Color.Blue)).toBe('blue');
    expect(f(Color.Green)).toBe('green');
    expect(Color.Red.get()).toBe(1);
});
