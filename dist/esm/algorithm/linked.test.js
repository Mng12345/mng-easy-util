import { LinkedNode } from './linked';
import { sum } from '../math';
test('constructor & addValue & addNode', () => {
    const node = new LinkedNode(1);
    node.addNode(new LinkedNode(2)).addValue(3);
    let testNode = node;
    const testFunc = () => {
        let array = testNode.toArray();
        let reversedArray = testNode.toArray(true);
        expect(array.length === 3 && reversedArray.length === 3).toBe(true);
        expect(sum(array)).toBe(6);
        expect(sum(reversedArray)).toBe(6);
        expect(array[0]).toBe(1);
        expect(reversedArray[0]).toBe(3);
    };
    testFunc();
    testNode = node.next;
    testFunc();
});
test('constructor & insertValue & insertNode', () => {
    const node = new LinkedNode(1);
    node.addValue(2).addValue(3);
    const secondNode = node.next;
    node.insertNode(new LinkedNode(1.5));
    secondNode.insertValue(2.5);
    const array = node.toArray();
    const reversedArray = node.toArray(true);
    console.log(`array:`, array);
    console.log(`reversed array:`, reversedArray);
    expect(array.length === 5 && reversedArray.length === 5).toBe(true);
    expect(array[1]).toBe(1.5);
    expect(array[3]).toBe(2.5);
    expect(reversedArray[1]).toBe(2.5);
    expect(reversedArray[3]).toBe(1.5);
});
test('remove', () => {
    const node = new LinkedNode(1);
    node.addValue(2).addValue(3).addValue(4).addValue(5);
    const medianValue = node.next.next;
    console.log(`array before remove:`, node.toArray());
    const [prev, next] = medianValue.remove();
    console.log(`prev:`, prev.toString());
    console.log(`next:`, next.toString());
    console.log(`array:`, node.toArray());
});
