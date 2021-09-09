"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEffect = void 0;
const healtheffect_1 = require("./healtheffect");
const effect_1 = require("../effect");
/**
 * An Effect applied to a Player instance.
 * This can be inflicted by a weapon or spell, given manually, or applied on a basis of race.
 */
class PlayerEffect extends effect_1.Effect {
    /**
     * An Effect applied to a Player instance.
     * This can be inflicted by a weapon or spell, given manually, or applied on a basis of race
     * @param {string} name - The effect's name.
     * @param {string[]} ignoreRaces - (Optional) - A list of races the effect can't be applied to.
     */
    constructor(name, ignoreRaces) {
        super(name);
        this.health = { effect: new healtheffect_1.HealthEffect(), enabled: true };
        this.name = name;
        this.ignoreRaces = ignoreRaces || [];
    }
    setHealth(healthEffect) {
        this.health.effect = healthEffect;
        return this;
    }
    setMeta(meta) {
        this.meta = meta;
        return this;
    }
    applyTo(target) {
        target.addEffect(this);
        return this;
    }
}
exports.PlayerEffect = PlayerEffect;
