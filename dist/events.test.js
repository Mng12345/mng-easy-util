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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./events");
var file_1 = require("./file");
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
test('fire & fireAsync', function () { return __awaiter(void 0, void 0, void 0, function () {
    var observer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                observer = new events_1.Observer();
                observer.on('fire async and sync events', function () {
                    console.log("fire sync event1");
                });
                observer.on('fire async and sync events', function () {
                    console.log("fire sync event2");
                });
                observer.on('fire async and sync events', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, file_1.sleep(1000)];
                            case 1:
                                _a.sent();
                                console.log("fire async event3");
                                return [2 /*return*/];
                        }
                    });
                }); });
                observer.on('fire async and sync events', function () {
                    console.log("fire sync event4");
                });
                observer.on('fire async and sync events', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, file_1.sleep(1000)];
                            case 1:
                                _a.sent();
                                console.log("fire async event5");
                                return [2 /*return*/];
                        }
                    });
                }); });
                // console.log(`test fire events`)
                // observer.fire('fire async and sync events')
                // console.log(`test fireAsync events`)
                return [4 /*yield*/, observer
                        .fireAsync('fire async and sync events')];
            case 1:
                // console.log(`test fire events`)
                // observer.fire('fire async and sync events')
                // console.log(`test fireAsync events`)
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, 10000);
