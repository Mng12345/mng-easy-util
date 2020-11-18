"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./events");
test('on & fire', function () {
    var observer = new events_1.Observer();
    observer.on('event1', function () {
        console.log("fire event1");
    });
    observer.on('event1', function () {
        console.log("fire event1 again");
    });
    observer.on('event2', function () {
        console.log("fire event2");
    });
    observer.on('event2', function () {
        console.log("fire event2 with args: " + JSON.stringify(arguments));
    });
    observer.fire('event1');
    observer.fire('event2');
    observer.fire('event2', 'a', 'b', 'c');
});
