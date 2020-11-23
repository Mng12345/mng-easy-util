import {stringifyNoCircle} from "./json";

test('stringify', () => {
    type A = {
        x: number
        obj: undefined|A
    }
    const a: A = {
        x: 1,
        obj: undefined
    };
    a.obj = a;
    try {
        JSON.stringify(a);
    } catch (e) {
        expect(e !== undefined && e !== null).toBe(true);
    }
    try {
        const str = stringifyNoCircle(a);
        console.log(str);
    } catch (e) {
        throw e;
    }
})
