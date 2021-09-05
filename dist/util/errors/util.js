"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorError = void 0;
class ConstructorError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name || "ConstructorError";
    }
}
exports.ConstructorError = ConstructorError;
