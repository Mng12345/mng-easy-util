"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../math");
var stream_1 = require("../stream");
var linear_regression_1 = require("./linear-regression");
test('linear-regression', function () {
    // y = 0.3x + 0.5
    var simulationF = function (x) {
        return 0.3 * x + 0.5 + Math.random() * 0.1;
    };
    var x = stream_1.Stream.of(math_1.range(0, 100, 1))
        .map(function (item) { return [item]; })
        .collect();
    var y = stream_1.Stream.of(x)
        .map(function (item) { return simulationF(item[0]); })
        .collect();
    var options = {
        x: x,
        y: y,
        initValues: [0.2, 13],
        maxIterations: 2000,
        tolerance: 0.0001,
    };
    var params = linear_regression_1.fit(options);
    console.log("params:", params);
});
