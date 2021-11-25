"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enumration_1 = require("./enumration");
const match_1 = require("./match");
test('enumration', function () {
    class Color extends enumration_1.Enumration {
    }
    Color.Red = new Color(1);
    Color.Green = new Color(2);
    Color.Blue = new Color(3);
    function f(color) {
        return match_1.match(color, [
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
