"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
class Character {
    constructor(name, bio, stats, inventory, meta) {
        this.increaseFormula = { str: '', max: function (s) { } };
        this.name = name;
        this.stats = stats;
        this.meta = meta;
        if (!inventory) {
            inventory = { armor: null, items: null, mainHand: null };
        }
        this.inventory = inventory;
        if (!bio.level) {
            bio.level = 0;
        }
        if (!bio.xp) {
            bio.xp = 0;
        }
        this.bio = bio;
    }
    ;
    takeDamage(damage, nokill) {
        if (typeof damage != "number" && typeof damage != "string") {
            throw new TypeError("Error in Character#takeDamage: Param 'damage' must be of type 'number' or 'string'.");
        }
        if (typeof damage == "string") {
            if (isNaN(damage)) {
                throw new TypeError("Error in Character#takeDamage: Param 'damage' is string but cannot be converted to number.");
            }
            else {
                damage = Number(damage);
            }
        }
        if (this.stats.hp.latticeHP && this.stats.hp.latticeHP > 0) {
            let t = this.stats.hp.latticeHP;
            this.stats.hp.latticeHP -= damage;
            damage -= t;
            this.stats.hp.latticeHP = this.stats.hp.latticeHP < 0 ? 0 : this.stats.hp.latticeHP;
            damage = damage < 0 ? 0 : damage;
        }
        if (typeof this.stats.hp.currentHP == "undefined" || this.stats.hp.currentHP === null) {
            this.stats.hp.currentHP = this.stats.hp.maxHP;
        }
        this.stats.hp.currentHP -= damage;
        if (this.stats.hp.currentHP <= 0 && !nokill) {
            this.kill();
        }
        return this;
    }
    ;
    //public heal() {};
    //public levelUp() {};
    //public getXp() {};
    //public useWeapon(w: Weapon) {};
    //public useItem(i) {};
    kill(message) {
    }
    ;
    //public revive() {};
    //public flow() {};
    //public setFormula() {};
    //public setKillHP(hp: number) {};
    //public static inventory() {};
    get lvlstr() {
        return `Level ${this.level} - `;
    }
    ;
    get formula() {
        return this.increaseFormula;
    }
    set formula(f) {
        this.formula = f;
    }
    get killHP() {
        if (typeof this.stats.hp.killHP == "number") {
            return this.stats.hp.killHP;
        }
        else {
            let khp = this.stats.hp.killHP;
            if (khp == "-max" || typeof khp == "undefined") {
                return this.stats.hp.maxHP * (0 - 1);
            }
            else if (khp == "-1/2max") {
                return (this.stats.hp.maxHP / 2) * (0 - 1);
            }
            else if (khp == "-2/3max") {
                return ((this.stats.hp.maxHP / 3) * 2) * (0 - 1);
            }
            else {
                throw new TypeError("Error in getter Character#killHP: Character#stats.hp.killHP was not set to a valid value.");
            }
        }
    }
    ;
    set killHP(hp) {
        this.stats.hp.killHP = hp;
    }
    ;
}
exports.Character = Character;
