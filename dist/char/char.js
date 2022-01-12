"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Char = void 0;
class Char {
    constructor(name) {
        this.statuses = new Map();
        this.name = name;
    }
    addStatus(status) {
        this.statuses.set(status.id, status);
        status.onApply(status, this);
        return this;
    }
    ;
    removeStatus(status) {
        this.statuses.delete(status.id);
        status.onRemove(status, this);
        return this;
    }
    ;
}
exports.Char = Char;
