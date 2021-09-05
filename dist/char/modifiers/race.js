"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Race = void 0;
class Race {
    constructor(name) {
        this.name = name;
    }
    setMeta(meta) {
        this.meta = meta;
        return this;
    }
}
exports.Race = Race;
