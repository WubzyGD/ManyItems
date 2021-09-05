"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthManagerConstructorError = exports.HealthManagerError = void 0;
class HealthManagerError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name || "HealthManagerError";
    }
}
exports.HealthManagerError = HealthManagerError;
class HealthManagerConstructorError extends HealthManagerError {
    constructor(message) {
        super(message);
        this.name = "HealthMangerConstructorError";
    }
}
exports.HealthManagerConstructorError = HealthManagerConstructorError;
