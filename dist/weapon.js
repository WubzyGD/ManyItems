"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weapon = void 0;
const attack_1 = require("./attack");
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
let sword = new Weapon("Sword", new attack_1.Attack("Stab"))
    .setMeta({})
    .setAttackParams({
    canAttack: true, durability: true, maxRange: 100, durabilityMode: "heap",
    statuses: { holder: null, victim: ["sliced"] },
    custom: { aCustomProperty: "Some Data!" }
})
    .editStats({});
console.log(sword, sword.metaInfo);
