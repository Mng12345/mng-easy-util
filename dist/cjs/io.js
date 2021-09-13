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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineReader = void 0;
const readline_1 = __importDefault(require("readline"));
const fs_1 = __importDefault(require("fs"));
class LineReader {
    constructor(path) {
        this.path = path;
        this.readInterface = readline_1.default.createInterface(fs_1.default.createReadStream(path));
        this.iter = this.readInterface[Symbol.asyncIterator]();
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.iter.next();
            if (value.done) {
                return null;
            }
            else {
                return value.value;
            }
        });
    }
    close() {
        this.readInterface.close();
    }
}
exports.LineReader = LineReader;
