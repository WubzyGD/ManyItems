"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
class Effect {
    constructor(id, displayName) {
        this._id = id;
        this.displayName = displayName || id;
    }
    setDisplayName(name) {
        this.displayName = name;
        return this;
    }
    ;
    get id() { return this._id; }
    ;
}
exports.Effect = Effect;
