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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncPool = void 0;
var lodash_1 = require("lodash");
var file_1 = require("./file");
var chalk_1 = __importDefault(require("chalk"));
var throttleLog = lodash_1.throttle(function () {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    return console.log.apply(console, __spread(data));
}, 2000);
var AsyncPool = /** @class */ (function () {
    function AsyncPool(size) {
        this.size = size;
        this.taskCount = 0;
        this.taskMap = new Map();
        this.resultMap = new Map();
        this.buffer = [];
    }
    AsyncPool.prototype.pushInner = function (task, taskId) {
        var _this = this;
        if (this.taskMap.has(taskId)) {
            console.log(chalk_1.default.red("warning: task with taskId[" + taskId + "] already exists, please check your code!"));
            return;
        }
        var voidTask = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, task()];
                    case 1:
                        result = _a.sent();
                        this.resultMap.set(taskId, {
                            taskId: taskId,
                            result: result,
                            error: undefined
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.resultMap.set(taskId, {
                            taskId: taskId,
                            result: undefined,
                            error: e_1
                        });
                        console.log(chalk_1.default.yellow("task[" + taskId + "] has failed with error:\n"));
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        if (this.taskMap.size < this.size) {
            this.taskMap.set(taskId, {
                taskId: taskId,
                status: 'running'
            });
            voidTask().finally(function () {
                _this.taskMap.delete(taskId);
            });
        }
        else {
            this.buffer.push({
                taskId: taskId,
                task: task
            });
        }
    };
    AsyncPool.prototype.push = function (task, taskId) {
        this.pushInner(task, taskId);
        this.taskCount += 1;
    };
    AsyncPool.prototype.wait = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wrappedTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.taskMap.size < this.size && this.buffer.length > 0)) return [3 /*break*/, 1];
                        wrappedTask = this.buffer.shift();
                        this.pushInner(wrappedTask.task, wrappedTask.taskId);
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(this.taskMap.size === 0 && this.buffer.length === 0)) return [3 /*break*/, 2];
                        throttleLog("async pool status: " + chalk_1.default.greenBright(this.taskMap.size) + " tasks running, " + chalk_1.default.yellow(this.buffer.length) + " tasks waiting, already processed " + chalk_1.default.blue(this.resultMap.size + "/" + this.taskCount) + ".");
                        console.log(chalk_1.default.green("all tasks done."));
                        return [3 /*break*/, 5];
                    case 2:
                        throttleLog("async pool status: " + chalk_1.default.greenBright(this.taskMap.size) + " tasks running, " + chalk_1.default.yellow(this.buffer.length) + " tasks waiting, already processed " + chalk_1.default.blue(this.resultMap.size + "/" + this.taskCount) + ".");
                        console.log("async pool status: " + this.taskMap.size + " tasks running, " + this.buffer.length + " tasks waiting, already processed " + chalk_1.default.blue(this.resultMap.size + "/" + this.taskCount) + ".");
                        return [4 /*yield*/, file_1.sleep(50)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 0];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AsyncPool;
}());
exports.AsyncPool = AsyncPool;
