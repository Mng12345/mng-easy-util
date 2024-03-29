import { Option } from './option';
test('Option', () => {
    const option1 = new Option(1);
    const option2 = new Option(null);
    const option3 = new Option(undefined);
    expect(option1.hasValue()).toBe(true);
    expect(option2.hasValue()).toBe(false);
    expect(option3.hasValue()).toBe(false);
});
