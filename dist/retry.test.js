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
var file_1 = require("./file");
var retry_1 = require("./retry");
test('retry1', function () { return __awaiter(void 0, void 0, void 0, function () {
    var f1, fRetry1, res1, f2, fRetry2, res2, e_1, f3, fRetry3, res3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                f1 = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, file_1.sleep(500)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, 1];
                        }
                    });
                }); };
                fRetry1 = retry_1.retry({
                    func: f1,
                    times: 3,
                    errCb: function (e) { return console.log(e); },
                    isAsync: true
                });
                return [4 /*yield*/, fRetry1()];
            case 1:
                res1 = _a.sent();
                expect(res1).toBe(1);
                f2 = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, file_1.sleep(500)];
                            case 1:
                                _a.sent();
                                throw "err";
                        }
                    });
                }); };
                fRetry2 = retry_1.retry({
                    func: f2,
                    times: 3,
                    errCb: function (e) { return console.log("retrying..."); },
                    isAsync: true
                });
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, fRetry2()];
            case 3:
                res2 = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5:
                f3 = function (a) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, file_1.sleep(500)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, a + 1];
                        }
                    });
                }); };
                fRetry3 = retry_1.retry({
                    func: f3,
                    times: 3,
                    errCb: function (e) { return console.log(e); },
                    isAsync: true
                });
                return [4 /*yield*/, fRetry3(3)];
            case 6:
                res3 = _a.sent();
                expect(res3).toBe(4);
                return [2 /*return*/];
        }
    });
}); }, 3000);
test('retry2', function () {
    var f1 = function () {
        return 1;
    };
    var fRetry1 = retry_1.retry({
        func: f1,
        times: 3,
        errCb: function (e) { return console.log(e); }
    });
    var res1 = fRetry1();
    expect(res1).toBe(1);
    var f2 = function () {
        throw "err";
    };
    var fRetry2 = retry_1.retry({
        func: f2,
        times: 3,
        errCb: function (e) { return console.log("retrying..."); }
    });
    try {
        var res2 = fRetry2();
    }
    catch (e) {
        console.log(e);
    }
    var f3 = function (a) {
        return a + 1;
    };
    var fRetry3 = retry_1.retry({
        func: f3,
        times: 3,
        errCb: function (e) { return console.log(e); }
    });
    var res3 = fRetry3(3);
    expect(res3).toBe(4);
}, 3000);
