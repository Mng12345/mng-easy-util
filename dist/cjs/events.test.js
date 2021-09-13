"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
const file_1 = require("./file");
const func_util_1 = require("./func-util");
test('on & fire', () => {
    const observer = new events_1.Observer();
    observer.on('event1', () => {
        console.log(`fire event1`);
    });
    observer.on('event1', () => {
        console.log(`fire event1 again`);
    });
    observer.on('event2', () => {
        console.log(`fire event2`);
    });
    observer.on('event2', function () {
        console.log(`fire event2 with args: ${JSON.stringify(arguments)}`);
    });
    observer.fire('event1');
    observer.fire('event2');
    observer.fire('event2', 'a', 'b', 'c');
});
test('fire & fireAsync', () => __awaiter(void 0, void 0, void 0, function* () {
    const observer = new events_1.Observer();
    observer.on('fire async and sync events', () => {
        console.log(`fire sync event1`);
    });
    observer.on('fire async and sync events', () => {
        console.log(`fire sync event2`);
    });
    observer.on('fire async and sync events', () => __awaiter(void 0, void 0, void 0, function* () {
        yield file_1.sleep(1000);
        console.log(`fire async event3`);
    }));
    observer.on('fire async and sync events', () => {
        console.log(`fire sync event4`);
    });
    observer.on('fire async and sync events', () => __awaiter(void 0, void 0, void 0, function* () {
        yield file_1.sleep(1000);
        console.log(`fire async event5`);
    }));
    // console.log(`test fire events`)
    // observer.fire('fire async and sync events')
    // console.log(`test fireAsync events`)
    yield observer
        .fireAsync('fire async and sync events');
}), 10000);
test('free', () => {
    const observer = new events_1.Observer();
    const handler = () => console.log(`on fire handler`);
    const handler1 = func_util_1.copyFunc(handler);
    observer.on('event1', handler);
    observer.on('event1', handler1);
    // observer.free({
    //   event: 'event1',
    //   handler
    // })
    // observer.fire('event1')
    // observer.free({
    //   event: 'event1',
    //   handler: handler1
    // })
    // observer.fire('event1')
    // observer.free({
    //   event: 'event1'
    // })
    observer.free({});
    observer.fire('event1');
});
test('priority', () => {
    const observer = new events_1.Observer();
    observer.on('test', () => {
        console.log(`event1`);
    });
    observer.on('test', () => {
        console.log(`event2`);
    }, 2);
    observer.on('test', () => {
        console.log(`event3`);
    }, 1);
    observer.fire('test');
});
