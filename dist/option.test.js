"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var option_1 = require("./option");
test('Option', function () {
    var option1 = new option_1.Option(1);
    var option2 = new option_1.Option(null);
    var option3 = new option_1.Option(undefined);
    expect(option1.hasValue()).toBe(true);
    expect(option2.hasValue()).toBe(false);
    expect(option3.hasValue()).toBe(false);
});
