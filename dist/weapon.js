"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weapon = void 0;
const attack_1 = require("./attack");
const mod_1 = require("./mod");
class Weapon {
    constructor(name, mainAttack, attackParams, metaInfo) {
        this.name = name;
        if (mainAttack) {
            this.mainAttack = mainAttack;
        }
        else {
            this.mainAttack = null;
        }
        if (attackParams) {
            this.attackParams = Weapon.verifyAttackParams(attackParams, this, true);
        }
        else {
            this.attackParams = null;
        }
        if (metaInfo) {
            this.meta = Weapon.verifyMetaInfo(metaInfo, this, true);
        }
        else {
            this.meta = null;
        }
    }
    ;
    setMainAttack(attack) {
        this.mainAttack = attack;
        return this;
    }
    ;
    setMetaInfo(meta) {
        this.meta = meta;
        return this;
    }
    ;
    setMeta(meta) {
        return this.setMetaInfo(meta);
    }
    ;
    setAttackParams(params) {
        this.attackParams = params;
        return this;
    }
    ;
    editStats(newStats, clearOld) {
        return this;
    }
    ;
    static verifyAttackParams(params, w, full) {
        if (full) {
            function verify(obj) { return 'canAttack' in obj; }
            if (verify(params)) {
                w.attackParams = params;
            }
            else {
                throw new SyntaxError("Invalid 'attackParams' given.");
            }
        }
        return params;
    }
    ;
    static verifyMetaInfo(params, w, full) {
        return params;
    }
    ;
    get metaInfo() { return this.meta; }
    ;
}
exports.Weapon = Weapon;
let sword = new Weapon("Sword", new attack_1.Attack("Stab", new mod_1.Mod("Example1", {
    chance: 40, mode: "reroll_merge",
    bonusChance: {
        force: 5,
        random: { min: 5, max: 10 }
    }, slugChance: {
        force: 5,
        random: { min: 5, max: 10 }
    }
}, { damageAdd: 10, multiplier: 1.5, multiplierAC: 10 }, "default"))).setMeta({})
    .setAttackParams({
    canAttack: true, durability: true, maxRange: 100, durabilityMode: "heap",
    statuses: { holder: null, victim: ["sliced"] },
    custom: { aCustomProperty: "Some Data!" }
})
    .editStats({});
let myw = new Weapon("Euclidator", new attack_1.Attack("Slash", new mod_1.Mod("Dark Damage", { always: true }, {
    damageAdd: {
        force: 3, random: {
            min: 2, max: 6
        }
    }, statuses: {
        victim: "-5HP/2 Turns"
    }
}, "disable")), {
    canAttack: true,
    durability: true,
    maxRange: 5,
});
console.log(sword);
console.log(myw);
