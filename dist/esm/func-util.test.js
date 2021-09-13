import { FuncClassTrace } from './func-util';
test('doOneTime', () => {
    const func = () => { };
    FuncClassTrace.doOneTime(func, 'func');
    FuncClassTrace.doOneTime(func, 'func');
    FuncClassTrace.doOneTime(func, 'func');
    expect(FuncClassTrace.getCalledCount('func')).toBe(1);
    FuncClassTrace.clear('func');
});
test('callCount', () => {
    const func = () => { };
    FuncClassTrace.callCount(func, 'func');
    FuncClassTrace.callCount(func, 'func');
    FuncClassTrace.callCount(func, 'func');
    expect(FuncClassTrace.getCalledCount('func')).toBe(3);
    FuncClassTrace.clear('func');
});
test('clear', () => {
    const func = () => { };
    FuncClassTrace.callCount(func, 'func');
    FuncClassTrace.callCount(func, 'func');
    FuncClassTrace.clear();
    expect(FuncClassTrace.getCalledCount('func')).toBe(0);
    FuncClassTrace.callCount(func, 'func');
    FuncClassTrace.callCount(func, 'func');
    FuncClassTrace.clear('func');
    expect(FuncClassTrace.getCalledCount('func')).toBe(0);
});
