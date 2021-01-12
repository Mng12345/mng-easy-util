"use strict";
// async runner utils
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncRunners = exports.getAvailableRunners = exports.runBatch = exports.Runner = void 0;
var file_1 = require("./file");
/**
 * @deprecated
 */
var Runner = /** @class */ (function () {
    function Runner(runHook, initHook) {
        this.runHook = runHook;
        this.initHook = initHook;
        this.status = 'init';
    }
    Runner.prototype.run = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.status = 'pending';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.runHook()];
                    case 2:
                        result = _a.sent();
                        this.status = 'done';
                        return [2 /*return*/, result];
                    case 3:
                        e_1 = _a.sent();
                        this.status = 'reject';
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Runner.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.status = 'init';
                        return [4 /*yield*/, this.initHook()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Runner.prototype.wait = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime;
            var _this = this;
            return __generator(this, function (_a) {
                startTime = new Date().getTime();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // wait runner completed
                        var waitTimeout = function () {
                            var endTime = new Date().getTime();
                            if (endTime - startTime > timeout) {
                                reject("failed to restore runner with timeout: " + (endTime - startTime) + "ms");
                                return;
                            }
                            if (_this.status === 'done') {
                                resolve();
                                return;
                            }
                            else {
                                setTimeout(waitTimeout, 10);
                            }
                        };
                        waitTimeout();
                    })];
            });
        });
    };
    return Runner;
}());
exports.Runner = Runner;
/**
 * async run the runners with batch
 * @deprecated
 * @template T
 * @param {number} batch
 * @param {RunnerI<T>[]} runners
 * @return {Promise<T[]>}
 */
var runBatch = function (batch, runners) { return __awaiter(void 0, void 0, void 0, function () {
    var runnerBatch, runnerResults, i, batchResult, batchResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (runners.find(function (runner) { return runner.status !== 'init'; })) {
                    throw new Error("the status of each runners must be 'init' before runBatch");
                }
                runnerBatch = [];
                runnerResults = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < runners.length)) return [3 /*break*/, 5];
                if (!(runnerBatch.length < batch)) return [3 /*break*/, 2];
                runnerBatch.push(runners[i]);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, Promise.all(runnerBatch.map(function (runner) { return runner.run(); }))];
            case 3:
                batchResult = _a.sent();
                runnerResults.push.apply(runnerResults, __spread(batchResult));
                runnerBatch = [runners[i]];
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5:
                if (!(runnerBatch.length !== 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, Promise.all(runnerBatch.map(function (runner) { return runner.run(); }))];
            case 6:
                batchResult = _a.sent();
                runnerResults.push.apply(runnerResults, __spread(batchResult));
                _a.label = 7;
            case 7: return [2 /*return*/, runnerResults];
        }
    });
}); };
exports.runBatch = runBatch;
/**
 * get num available runners within timeout ms
 * @deprecated
 * @template T
 * @param {RunnerI<T>[]} runners
 * @param {number} num
 * @param {number} timeout
 */
var getAvailableRunners = function (runners, num, timeout) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (num > runners.length) {
            throw new Error("can not get more than the length of runners available runners");
        }
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var startTime = new Date().getTime();
                var deltaTime = 10;
                var getRunners = function () {
                    var endTime = new Date().getTime();
                    if (endTime - startTime > timeout) {
                        reject("getting " + num + " runners with timeout: " + timeout + "ms");
                        return;
                    }
                    var completedRunners = runners.filter(function (runner) { return runner.status === 'done'; });
                    if (completedRunners.length >= num) {
                        resolve(completedRunners.slice(0, num));
                    }
                    else {
                        setTimeout(getRunners, deltaTime);
                    }
                };
                getRunners();
            })];
    });
}); };
exports.getAvailableRunners = getAvailableRunners;
/**
 * AsyncRunners for easy use
 */
var AsyncRunners = /** @class */ (function () {
    function AsyncRunners(batch, runners) {
        this.batch = batch;
        this.runners = runners;
        this.status = 'init';
        this.calledReset = false;
        this.result = [];
    }
    AsyncRunners.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.calledReset)
                            return [2 /*return*/];
                        this.calledReset = true;
                        if (!(this.status === 'running')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.stop()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(this.status === 'stopping')) return [3 /*break*/, 5];
                        _a.label = 3;
                    case 3:
                        if (!(this.status !== 'stopped')) return [3 /*break*/, 5];
                        return [4 /*yield*/, file_1.sleep(10)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 5:
                        this.runners = [];
                        this.result = [];
                        this.status = 'init';
                        return [2 /*return*/];
                }
            });
        });
    };
    AsyncRunners.prototype.add = function () {
        var _a;
        var runner = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            runner[_i] = arguments[_i];
        }
        (_a = this.runners).push.apply(_a, __spread(runner));
        return this;
    };
    AsyncRunners.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.status = 'stopping';
                        _a.label = 1;
                    case 1:
                        if (!(this.status === 'stopping')) return [3 /*break*/, 3];
                        return [4 /*yield*/, file_1.sleep(10)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AsyncRunners.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var unitRunners, headRunner, unitResult, unitResult;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.status = 'running';
                        unitRunners = [];
                        _c.label = 1;
                    case 1:
                        if (!(this.runners.length > 0)) return [3 /*break*/, 5];
                        // @ts-ignore
                        if (this.status === 'stopping') {
                            return [3 /*break*/, 5];
                        }
                        if (!(unitRunners.length < this.batch)) return [3 /*break*/, 2];
                        headRunner = this.runners.shift();
                        unitRunners.push(headRunner);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, Promise.all(unitRunners.map(function (runner) { return runner(); }))];
                    case 3:
                        unitResult = _c.sent();
                        (_a = this.result).push.apply(_a, __spread(unitResult));
                        unitRunners = [];
                        _c.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5:
                        if (!(unitRunners.length > 0 && this.status === 'running')) return [3 /*break*/, 7];
                        return [4 /*yield*/, Promise.all(unitRunners.map(function (runner) { return runner(); }))];
                    case 6:
                        unitResult = _c.sent();
                        (_b = this.result).push.apply(_b, __spread(unitResult));
                        _c.label = 7;
                    case 7:
                        this.status = 'stopped';
                        return [2 /*return*/, this.result];
                }
            });
        });
    };
    return AsyncRunners;
}());
exports.AsyncRunners = AsyncRunners;
