"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weapon = void 0;
const attack_1 = require("./attack");
class Weapon {
    constructor(name, mainAttack, attackParams, attacks, metaInfo, stats) {
        this.name = name;
        if (mainAttack) {
            this.setMainAttack(mainAttack);
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
        this.verifyAttacks(mainAttack, attacks);
        if (metaInfo) {
            this.meta = Weapon.verifyMetaInfo(metaInfo, this, true);
        }
        else {
            this.meta = null;
        }
    }
    ;
    setMainAttack(attack) {
        if (!(attack instanceof attack_1.Attack) && attack !== null) {
            console.log(attack);
            throw new SyntaxError("Weapon param 'mainAttack' must be an instance of class 'Attack'");
        }
        this.verifyAttacks(attack, this.attacks);
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
    setAttacks(attacks) {
        this.attacks = this.verifyAttacks(this.mainAttack, attacks);
        return this;
    }
    ;
    addAttack(attack) {
        this.verifyAttacks(this.mainAttack, this.attacks).push(attack);
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
        if (full) {
            function verify(obj) { return 'author' in obj || 'rarity' in obj; }
            if (verify(params)) {
                w.meta = params;
            }
            else {
                throw new SyntaxError("Invalid 'metaInfo' given.");
            }
        }
        return params;
    }
    ;
    verifyAttacks(mainAttack, attacks) {
        if (mainAttack === null && attacks) {
            throw new SyntaxError("Attack(s) given in Weapon constructor or setAttacks(), but no Main Attack is set. Make sure you designate a main attack in constructor or use setMainAttack().");
        }
        if (attacks && mainAttack) {
            if (Array.isArray(attacks)) {
                if (!attacks.includes(mainAttack)) {
                    attacks.push(mainAttack);
                    this.attacks = attacks;
                }
            }
            else {
                this.attacks = [mainAttack, attacks];
            }
        }
        else if (!attacks && mainAttack) {
            this.attacks = [mainAttack];
        }
        else {
            this.attackParams = { canAttack: false };
        }
        if (attacks instanceof attack_1.Attack && !Array.isArray(attacks)) {
            this.attacks = [attacks];
        }
        return this.attacks;
    }
    ;
    get metaInfo() { return this.meta; }
    ;
}
exports.Weapon = Weapon;
/*let sword = new Weapon("Sword")
.setMainAttack(new Attack("Stab", null))
.setAttackParams({canAttack: true, durability: true, maxRange: 20, statuses: "bleeding"})
.setMeta({author: "WubzyGD", rarity: "Common"});

console.log(sword);*/
/*let r = new Random("complex", null, {min: 5, max: 10}, {force: 2, random: {min: 5, max: 10}});

console.log(r.rand);*/ 
