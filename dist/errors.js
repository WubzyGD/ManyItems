"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelAssignmentError = exports.XPAssignmentError = exports.ErrorBuilder = void 0;
const ErrorBuilder = (name) => class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = name;
    }
};
exports.ErrorBuilder = ErrorBuilder;
var xp_1 = require("./features/xp");
Object.defineProperty(exports, "XPAssignmentError", { enumerable: true, get: function () { return xp_1.XPAssignmentError; } });
Object.defineProperty(exports, "LevelAssignmentError", { enumerable: true, get: function () { return xp_1.LevelAssignmentError; } });
