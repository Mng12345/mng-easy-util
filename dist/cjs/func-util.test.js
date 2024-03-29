"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const func_util_1 = require("./func-util");
test('doOneTime', () => {
    const func = () => { };
    func_util_1.FuncClassTrace.doOneTime(func, 'func');
    func_util_1.FuncClassTrace.doOneTime(func, 'func');
    func_util_1.FuncClassTrace.doOneTime(func, 'func');
    expect(func_util_1.FuncClassTrace.getCalledCount('func')).toBe(1);
    func_util_1.FuncClassTrace.clear('func');
});
test('callCount', () => {
    const func = () => { };
    func_util_1.FuncClassTrace.callCount(func, 'func');
    func_util_1.FuncClassTrace.callCount(func, 'func');
    func_util_1.FuncClassTrace.callCount(func, 'func');
    expect(func_util_1.FuncClassTrace.getCalledCount('func')).toBe(3);
    func_util_1.FuncClassTrace.clear('func');
});
test('clear', () => {
    const func = () => { };
    func_util_1.FuncClassTrace.callCount(func, 'func');
    func_util_1.FuncClassTrace.callCount(func, 'func');
    func_util_1.FuncClassTrace.clear();
    expect(func_util_1.FuncClassTrace.getCalledCount('func')).toBe(0);
    func_util_1.FuncClassTrace.callCount(func, 'func');
    func_util_1.FuncClassTrace.callCount(func, 'func');
    func_util_1.FuncClassTrace.clear('func');
    expect(func_util_1.FuncClassTrace.getCalledCount('func')).toBe(0);
});
