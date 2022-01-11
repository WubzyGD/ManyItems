"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayInput = void 0;
class ArrayInput {
    constructor(input) {
        this.input = input;
    }
    makeArray() {
        return Array.isArray(this.input) ? this.input : [this.input];
    }
    static makeArray(input) {
        return Array.isArray(input) ? input : [input];
    }
}
exports.ArrayInput = ArrayInput;
