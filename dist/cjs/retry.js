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
exports.retry = void 0;
function retry({ func, times, errCb = (e) => { }, isAsync = false }) {
    if (isAsync) {
        return (...args) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < times; i++) {
                try {
                    return yield func(...args);
                }
                catch (e) {
                    errCb(e);
                }
            }
        });
    }
    else {
        return (...args) => {
            for (let i = 0; i < times; i++) {
                try {
                    return func(...args);
                }
                catch (e) {
                    errCb(e);
                }
            }
        };
    }
}
exports.retry = retry;
