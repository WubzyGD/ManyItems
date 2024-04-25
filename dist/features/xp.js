"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelAssignmentError = exports.XPAssignmentError = exports.XP = void 0;
const errors_1 = require("../errors");
const feature_1 = require("./feature");
class XP extends feature_1.Feature {
    constructor(startLevel, startXP) {
        super("XP", 'xp');
        this.runGainHookOnLevelUp = true;
        this.levelCheck = () => false;
        this.gainHook = () => { };
        this.levelHook = (tl, xp) => { xp.forceXP(0); };
        this.levelAlgorithm = x => Math.ceil((x * 11) + (x ** 1.05));
        this._xp = 0;
        this._level = 1;
        this._level = startLevel || this.level;
        this.xp = startXP || this.xp;
    }
    applyTo(toApply) { super.applyTo(toApply); return this; }
    async asyncApplyTo(toApply) { await super.asyncApplyTo(toApply); return this; }
    setHook(hook) { super.setHook(hook); return this; } //TODO better way to do this?
    forceXP(xp, levelCheck = true) {
        this._xp = xp;
        if (levelCheck) {
            this.levelCheck(this);
        }
        return this;
    }
    forceLevel(level) {
        this._level = level;
        return this;
    }
    levelUp() {
        this.level++;
        return this;
    }
    setLevelCheck(newFunc) { this.levelCheck = newFunc; return this; }
    setGainHook(newFunc) { this.gainHook = newFunc; return this; }
    setLevelAlgorithm(newFunc) { this.levelAlgorithm = newFunc; return this; }
    setLevelHook(newFunc, wrap = true) {
        //! DISABLE WRAP if you have functionality in your hook that might block a levelup. the wrapper will still run.
        this.levelHook = wrap
            ? (tl, xp) => { XP.basicLevelHook(tl, this); return newFunc(tl, xp); }
            : newFunc;
        return this;
    }
    get xp() { return this._xp; }
    get level() { return this._level; }
    get currentLevelMax() { return this.levelAlgorithm(this.level); }
    set xp(xp) {
        const res = this.gainHook(xp, this);
        if (res === false) {
            return;
        }
        if (typeof res === "number") {
            if (xp < 0) {
                throw new exports.XPAssignmentError("Received less than 0 value from gainHook() that could not be applied to XP#xp.");
            }
            this._xp = res;
        }
        else {
            this._xp = xp;
        }
        if (this.levelCheck(this)) {
            this.levelUp();
        }
        return;
    }
    set level(level) {
        const res = this.levelHook(level, this);
        if (res === false) {
            return;
        }
        if (typeof res === "number") {
            if (level < 0) {
                throw new exports.XPAssignmentError("Received less than 0 value from levelHook() that could not be applied to XP#level.");
            }
            this._level = res;
            return;
        }
        this._level = level;
        return;
    }
}
exports.XP = XP;
XP.basicLevelHook = (tl, xp) => { xp.runGainHookOnLevelUp ? xp.xp = xp.xp - xp.currentLevelMax : xp.forceXP(xp.xp - xp.currentLevelMax); };
exports.XPAssignmentError = (0, errors_1.ErrorBuilder)('XPAssignmentError');
exports.LevelAssignmentError = (0, errors_1.ErrorBuilder)('LevelAssignmentError');
