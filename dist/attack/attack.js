"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attack = void 0;
const damage_1 = require("./damage");
class Attack {
    constructor(name, damage) {
        this.name = name;
        this.damage = typeof damage === 'number' ? new damage_1.Damage(damage) : damage;
    }
    attack(target, damage) {
        damage = damage || this.damage;
        if (typeof damage === 'number') {
            damage = new damage_1.Damage(damage);
        }
        target.takeDamage(damage.baseDamage);
        return this;
    }
}
exports.Attack = Attack;
