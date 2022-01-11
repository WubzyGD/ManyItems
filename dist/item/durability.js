"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Durability = void 0;
const util_1 = require("../util/dev/errors/util");
class Durability {
    constructor(maxDurability, options) {
        this.canBreak = true;
        this.canBecomeIrreparable = true;
        this.shatterOnBreak = false;
        this._brokenState = "healthy";
        if (typeof maxDurability === "number" && maxDurability <= 0) {
            throw new RangeError("Error in Durability constructor: 'maxDurability' must be a number greater than 0.");
        }
        this.maxDurability = Math.round(maxDurability);
        if (options) {
            if (typeof options.canBreak === 'boolean') {
                this.canBreak = options.canBreak;
            }
            if (options.currentState) {
                this.state = options.currentState;
            }
        }
        else {
            this._durability = this.maxDurability;
        }
    }
    break(noDurabilityChange, forceDurability) {
        this.state = 'broken';
        if (!noDurabilityChange) {
            this.durability = forceDurability || this.margins.broken;
        }
        return this;
    }
    ;
    heal(noDurabilityChange, forceDurability) {
        this.state = 'healthy';
        if (!noDurabilityChange) {
            this.durability = forceDurability || this.margins.broken;
        }
        return this;
    }
    ;
    shatter(noDurabilityChange, forceDurability) {
        this.state = 'irreparable';
        if (!noDurabilityChange) {
            this.durability = forceDurability || this.margins.broken;
        }
        return this;
    }
    ;
    weaken(noDurabilityChange, forceDurability) {
        this.state = 'weakened';
        if (!noDurabilityChange) {
            this.durability = forceDurability || this.margins.broken;
        }
        return this;
    }
    ;
    setDurability(durability) {
        this.durability = durability;
        return this;
    }
    ;
    checkState(doesThrow) {
        if (this.state === "irreparable" && !this.canBecomeIrreparable) {
            if (doesThrow) {
                throw new util_1.DurabilityStateError("This Durability does not support an irreparable state.");
            }
            this.state = "broken";
        }
        if (this.state === "broken" && !this.canBreak) {
            if (doesThrow) {
                throw new util_1.DurabilityStateError("This Durability does not support a broken state.");
            }
            this.state = this.shatterOnBreak && this.canBecomeIrreparable ? "irreparable" : "weakened";
        }
        return this;
    }
    ;
    checkDurability(doesThrow) {
        return this;
    }
    ;
    set state(state) {
        this._brokenState = state;
    }
    ;
    set durability(durability) {
        this.checkState();
        this._durability = durability;
    }
    ;
    get durability() {
        return this._durability;
    }
    ;
    get state() {
        return this._brokenState;
    }
    ;
    get isBroken() {
        return ["broken", "irreparable"].includes(this.state);
    }
    ;
    get isHealthy() {
        return this.state === "healthy";
    }
    ;
    get isIrreparable() {
        return this.state === "irreparable";
    }
    ;
    get isShattered() { return this.isIrreparable; }
    ;
    get canShatter() { return this.canBecomeIrreparable; }
    ;
    get rawStateEvents() { return this._stateEvents; }
    ;
}
exports.Durability = Durability;
