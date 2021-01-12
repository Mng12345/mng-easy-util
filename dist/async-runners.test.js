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
var async_runners_1 = require("./async-runners");
var file_1 = require("./file");
var stream_1 = require("./stream");
var math_1 = require("./math");
test('runBatch & getAvailableRunners', function () { return __awaiter(void 0, void 0, void 0, function () {
    var runners, timeStart, timeEnd, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                runners = [
                    new async_runners_1.Runner(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, file_1.sleep(1000)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); }); }),
                    new async_runners_1.Runner(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, file_1.sleep(1000)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); }); }),
                    new async_runners_1.Runner(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, file_1.sleep(1000)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); }); }),
                    new async_runners_1.Runner(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, file_1.sleep(1000)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); }); }),
                    new async_runners_1.Runner(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, file_1.sleep(1000)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); }); }),
                ];
                timeStart = new Date().getTime();
                return [4 /*yield*/, async_runners_1.runBatch(2, runners)];
            case 1:
                _c.sent();
                timeEnd = new Date().getTime();
                console.log("time use: " + (timeEnd - timeStart));
                expect(timeEnd - timeStart < 5000).toBe(true);
                // restore the status of all runners
                return [4 /*yield*/, Promise.all(runners.map(function (runner) { return runner.init(); }))
                    // let the runner run at least 2 seconds
                ];
            case 2:
                // restore the status of all runners
                _c.sent();
                // let the runner run at least 2 seconds
                async_runners_1.runBatch(2, runners).catch(function (err) { return console.log(err); });
                _a = expect;
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var timeStart, e_1, timeEnd_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    timeStart = new Date().getTime();
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, async_runners_1.getAvailableRunners(runners, 5, 1000)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/, true];
                                case 3:
                                    e_1 = _a.sent();
                                    console.log(e_1);
                                    timeEnd_1 = new Date().getTime();
                                    console.log("get available runners failed with in 1000ms, time used: " + (timeEnd_1 - timeStart));
                                    return [2 /*return*/, false];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })()];
            case 3:
                _a.apply(void 0, [_c.sent()]).toBe(false);
                _b = expect;
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var timeStart_1, timeEnd_2, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    timeStart_1 = new Date().getTime();
                                    return [4 /*yield*/, async_runners_1.getAvailableRunners(runners, 2, 1000)];
                                case 1:
                                    _a.sent();
                                    timeEnd_2 = new Date().getTime();
                                    console.log("get available runners time used: " + (timeEnd_2 - timeStart_1) + ", with in 1000ms");
                                    return [2 /*return*/, true];
                                case 2:
                                    e_2 = _a.sent();
                                    console.log(e_2);
                                    return [2 /*return*/, false];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })()];
            case 4:
                _b.apply(void 0, [_c.sent()]).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
test('runBatch', function () {
    ;
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var runners;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    runners = stream_1.Stream.of(math_1.range(0, 10, 1))
                        .map(function (i) {
                        return new async_runners_1.Runner(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("i: ", i);
                                        return [4 /*yield*/, file_1.sleep(10)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/];
                        }); }); });
                    })
                        .collect();
                    return [4 /*yield*/, async_runners_1.runBatch(2, runners)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })().catch(function (err) { return console.log(err); });
});
test('AsyncRunner', function () { return __awaiter(void 0, void 0, void 0, function () {
    var asyncRunner, runner1, runner2, runner3, timeStart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                asyncRunner = new async_runners_1.AsyncRunner(3, []);
                runner1 = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, file_1.sleep(1000)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, 1];
                        }
                    });
                }); };
                runner2 = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, file_1.sleep(2000)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, 2];
                        }
                    });
                }); };
                runner3 = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, file_1.sleep(3000)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, 3];
                        }
                    });
                }); };
                asyncRunner.add(runner1, runner2, runner3, runner1, runner3, runner2, runner3, runner1, runner2);
                timeStart = new Date().getTime();
                asyncRunner.run().catch(function (err) { throw err; });
                // wait runner1 and runner2 and runner3 run completed
                return [4 /*yield*/, file_1.sleep(3500)];
            case 1:
                // wait runner1 and runner2 and runner3 run completed
                _a.sent();
                return [4 /*yield*/, asyncRunner.stop()];
            case 2:
                _a.sent();
                console.log(asyncRunner.result);
                return [4 /*yield*/, file_1.sleep(3000)];
            case 3:
                _a.sent();
                console.log(asyncRunner.result);
                return [4 /*yield*/, asyncRunner.stop()];
            case 4:
                _a.sent();
                console.log(asyncRunner.result);
                return [2 /*return*/];
        }
    });
}); }, 10000);
