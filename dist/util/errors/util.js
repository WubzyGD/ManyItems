"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DurabilityStateError = exports.ValueError = exports.ConstructorError = void 0;
class ConstructorError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name || "ConstructorError";
    }
}
exports.ConstructorError = ConstructorError;
class ValueError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValueError";
    }
}
exports.ValueError = ValueError;
class DurabilityStateError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.DurabilityStateError = DurabilityStateError;
