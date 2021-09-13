"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../math");
const stream_1 = require("../stream");
const linear_regression_1 = require("./linear-regression");
test('linear-regression', () => {
    // y = 0.3x + 0.5
    const simulationF = (x) => {
        return 0.3 * x + 0.5 + Math.random() * 0.1;
    };
    const x = stream_1.Stream.of(math_1.range(0, 100, 1))
        .map((item) => [item])
        .collect();
    const y = stream_1.Stream.of(x)
        .map((item) => simulationF(item[0]))
        .collect();
    const options = {
        x,
        y,
        initValues: [0.2, 13],
        maxIterations: 2000,
        tolerance: 0.0001,
    };
    const params = linear_regression_1.fit(options);
    console.log(`params:`, params);
});
