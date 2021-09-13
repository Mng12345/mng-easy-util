// make promise with timeout
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const withTimeout = (promise, timeout) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        ;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const timer = setTimeout(() => {
                clearTimeout(timer);
                reject(`error with timeout: ${timeout}`);
            }, timeout);
            const t = yield promise;
            resolve(t);
        }))().catch((err) => reject(err));
    });
});
export function promisify(f) {
    return (...args) => __awaiter(this, void 0, void 0, function* () {
        return yield f(...args);
    });
}
