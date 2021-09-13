"use strict";
// event communication between components
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
exports.Observer = void 0;
const lodash_1 = __importDefault(require("lodash"));
class Observer {
    constructor() {
        this.handlers = {};
    }
    on(event, fn, priority = 0) {
        let handlers = this.handlers[event];
        if (handlers === undefined) {
            handlers = [];
        }
        handlers.push({ fn, priority });
        this.handlers[event] = handlers;
    }
    fire(event, ...args) {
        let handlers = this.handlers[event];
        if (handlers === undefined)
            return;
        // sort by priority
        handlers = lodash_1.default.sortBy(handlers, handler => handler.priority);
        handlers.forEach((handler) => {
            handler.fn(...args);
        });
    }
    fireAsync(event, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let handlers = this.handlers[event];
            if (handlers === undefined)
                return;
            handlers = lodash_1.default.sortBy(handlers, handler => handler.priority);
            for (let handler of handlers) {
                yield handler.fn(...args);
            }
        });
    }
    free({ event, handler, priority }) {
        if (event === undefined) { // free all
            this.handlers = {};
            return;
        }
        else {
            if (this.handlers[event] === undefined)
                return;
            if (handler === undefined) { // free event all
                this.handlers[event] = [];
            }
            else { // free event with single handler
                const handlers = this.handlers[event];
                if (priority === undefined) {
                    const newHandlers = [];
                    for (let i = 0; i < handlers.length; i++) {
                        if (handlers[i].fn !== handler) {
                            newHandlers.push(handlers[i]);
                        }
                    }
                    this.handlers[event] = newHandlers;
                }
                else {
                    const newHandlers = [];
                    for (let i = 0; i < handlers.length; i++) {
                        const item = handlers[i];
                        if (item.fn !== handler || item.priority !== priority) {
                            newHandlers.push(item);
                        }
                    }
                    this.handlers[event] = newHandlers;
                }
            }
        }
    }
}
exports.Observer = Observer;
