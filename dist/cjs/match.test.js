"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_1 = require("./match");
test('match', function () {
    const v1 = false;
    const r1 = match_1.match(v1, [
        [(v) => typeof v === 'string', (v) => `v: ${v}`],
        [(v) => typeof v === 'number', (v) => v + 1],
        [(v) => typeof v === 'boolean', (v) => `v: ${v}`],
    ]);
    expect(typeof r1).toBe('string');
    expect(r1).toBe(`v: false`);
    const v2 = 1;
    const r2 = match_1.match(v2, [
        [(v) => v === 1, (v) => `${v}`],
        [(v) => v === 2, (v) => `${v}`],
        [(v) => v === 3, (v) => `${v}`],
        [(v) => v === 4, (v) => `${v}`],
        [(v) => true, (v) => `${v}`],
    ]);
    expect(typeof r2).toBe('string');
    expect(r2).toBe(`${v2}`);
});
