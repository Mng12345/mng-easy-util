import {Observer} from "./events";

test('on & fire', () => {
    const observer = new Observer();
    observer.on('event1', () => {
        console.log(`fire event1`);
    });
    observer.on('event1', () => {
        console.log(`fire event1 again`);
    });
    observer.on('event2', () => {
        console.log(`fire event2`);
    });
    observer.on('event2', function() {
        console.log(`fire event2 with args: ${JSON.stringify(arguments)}`);
    })
    observer.fire('event1');
    observer.fire('event2');
    observer.fire('event2', 'a', 'b', 'c');
})
