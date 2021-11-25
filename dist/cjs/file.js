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
exports.download = exports.sleep = void 0;
/**
 * async sleep
 * @deprecated
 * @param {number} timeout
 * @return {Promise<void>}
 */
const sleep = (timeout) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
});
exports.sleep = sleep;
/**
 * download file which is Uint8Array
 * @param {Uint8Array[]} data
 * @param {string} filename
 * @param {string} type
 */
const download = (data, filename, type) => {
    const file = new Blob(data.map((item) => item.buffer), { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    a.remove();
};
exports.download = download;
