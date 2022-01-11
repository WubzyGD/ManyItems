"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weapon = void 0;
const item_1 = require("../item");
const damage_1 = require("../../attack/damage");
class Weapon extends item_1.Item {
    constructor(name, damage, type, id) {
        super(name, id);
        this.damage = damage instanceof damage_1.Damage ? damage : new damage_1.Damage(damage);
        this.type = type;
    }
}
exports.Weapon = Weapon;
