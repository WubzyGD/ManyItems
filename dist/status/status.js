"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatus = exports.Status = void 0;
class Status {
    constructor(id, displayName, onApply) {
        this.onApply = (status, target) => { };
        this.onRemove = (status, target) => { };
        this._id = id;
        this.displayName = displayName || id;
        if (onApply) {
            this.onApply = onApply;
        }
    }
    ;
    setDisplayName(name) {
        this.displayName = name;
        return this;
    }
    ;
    applyTo(target) {
        target.statuses.set(this.id, this);
        this.onApply(this, target);
        return this;
    }
    ;
    removeFrom(target) {
        target.statuses.delete(this.id);
        this.onRemove(this, target);
        return this;
    }
    ;
    get id() { return this._id; }
    ;
}
exports.Status = Status;
class PlayerStatus extends Status {
    constructor(id, displayName, onApply) {
        super(id, displayName, onApply);
    }
    ;
}
exports.PlayerStatus = PlayerStatus;
