import { SimpleQueue } from "./queue";
test('queue', () => {
    const queue = new SimpleQueue();
    queue.add(1);
    queue.add(2);
    queue.add(3);
    expect(queue.size).toBe(3);
    const v1 = queue.take();
    expect(queue.size).toBe(2);
    expect(v1).toBe(1);
    const v2 = queue.take();
    expect(queue.size).toBe(1);
    expect(v2).toBe(2);
    const v3 = queue.take();
    expect(queue.size).toBe(0);
    expect(v3).toBe(3);
    const v4 = queue.take();
    expect(queue.size).toBe(0);
    expect(v4).toBe(null);
});