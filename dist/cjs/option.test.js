"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = require("./option");
test('Option', () => {
    const option1 = new option_1.Option(1);
    const option2 = new option_1.Option(null);
    const option3 = new option_1.Option(undefined);
    expect(option1.hasValue()).toBe(true);
    expect(option2.hasValue()).toBe(false);
    expect(option3.hasValue()).toBe(false);
});
