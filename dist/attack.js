"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attack = void 0;
const mod_1 = require("./mod");
const char_1 = require("./char");
const random_1 = require("./random");
class Attack {
    constructor(name, baseInfo, mods, castText) {
        this.name = name;
        this.baseInfo = baseInfo;
        if (!Array.isArray(mods)) {
            mods = [mods];
        }
        this.mods = mods;
        this.castText = castText;
    }
    attack(victim) {
        let results = {
            damage: 0,
            statuses: [],
            victim: null,
            attack: this
        };
        let damage = 0;
        if (this.baseInfo.baseDamage instanceof random_1.Random) {
            damage += this.baseInfo.baseDamage.calc();
        }
        else {
            damage += this.baseInfo.baseDamage;
        }
        if (this.mods) {
            let modInfo = [];
            for (let mod of this.mods) {
                if (mod) {
                    if (victim) {
                        modInfo.push(mod.pulse(victim));
                    }
                    else {
                        modInfo.push(mod.pulse());
                    }
                }
            }
            for (let mod of modInfo) {
                if (mod !== null && mod.alt !== null) {
                    damage += mod.alt.fullCalculate();
                    for (let s of mod.alt.sweepStatuses()) {
                        results.statuses.push(s);
                    }
                    console.log(results.statuses);
                    results.statuses = mod_1.Mod.sweepStatuses(results.statuses);
                }
            }
        }
        if (this.baseInfo.healing == true) {
            damage *= -1;
        }
        if (this.baseInfo.statuses && typeof this.baseInfo.statuses !== "object") {
            if (typeof this.baseInfo.statuses == "string") {
                this.baseInfo.statuses = [this.baseInfo.statuses];
            }
            for (let s of this.baseInfo.statuses) {
                results.statuses.push(s);
            }
            results.statuses = mod_1.Mod.sweepStatuses(results.statuses);
        }
        results.damage = damage;
        if (!victim) {
            results.victim = null;
        }
        else if (victim instanceof char_1.Character) {
            results.victim = victim.name;
        }
        else {
            results.victim = victim;
        }
        return results;
    }
}
exports.Attack = Attack;
