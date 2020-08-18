"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mod = void 0;
class Mod {
    constructor(name, activateOn, mainEffects, onBS) {
        this.name = name;
        this.activateOn = activateOn;
    }
    ;
}
exports.Mod = Mod;
let ex1 = new Mod("Example1", {
    chance: 40, mode: "reroll_merge",
    bonusChance: {
        force: 5,
        random: { min: 5, max: 10 }
    }, slugChance: {
        force: 5,
        random: { min: 5, max: 10 }
    }
}, { damageAdd: 10, multiplier: 1.5, multiplierAC: 10 }, "default");
console.log(ex1);
