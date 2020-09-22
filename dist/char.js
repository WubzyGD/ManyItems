"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
class Character {
    constructor(name, bio, stats, inventory, meta) {
        this.isDead = false;
        this.level = 0;
        this.xp = 0;
        this.increaseFormula = function (lvl, char) {
            lvl += 1;
            return Math.floor((lvl * (100 * (lvl * .3))) + ((lvl * 6) + (0.3 * (100 * lvl)) + (3 * (lvl ^ 2))));
        };
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
    heal(hp) {
        if (typeof hp != "number" && typeof hp != "string") {
            throw new TypeError("Error in Character#heal: Param 'hp' must be of type 'number' or 'string'.");
        }
        if (typeof hp == "string") {
            if (isNaN(hp)) {
                throw new TypeError("Error in Character#heal: Param 'hp' is string but cannot be converted to number.");
            }
            else {
                hp = Number(hp);
            }
        }
        return this.takeDamage(hp * -1);
    }
    ;
    max() {
        return this.formula(this.level, this);
    }
    ;
    //public levelUp() {};
    //public getXp() {};
    //public setFormula(formula: string): Character {};
    //public useWeapon(w: Weapon) {};
    //public useItem(i) {};
    kill(message) {
        message = message ? message : this.onDeath.deathMessage;
    }
    ;
    //public revive() {};
    //public setFormula() {};
    //public setKillHP(hp: number) {};
    //public setFlow(flow: Flow): Character {};
    //public static inventory() {};
    get lvlstr() {
        return `Level ${this.level} - [${this.xp}/${this.formula(this.level, this)}]`;
    }
    ;
    get formula() {
        return this.increaseFormula;
    }
    ;
    set formula(formula) {
        if (typeof formula !== "function") {
            throw new TypeError("Formula must be a function!");
        }
        let test = formula(this.level, this.xp, this);
        if (!test && test !== 0) {
            throw new EvalError("Formula does not have a return parameter. Please finish with a return statement that passes a number.");
        }
        if (typeof test !== "number") {
            throw new EvalError("Formula does not return a number, instead returns '" + typeof test + "'. Make sure your types are correctly lined up and that you're returning a number!");
        }
        this.increaseFormula = formula;
    }
    ;
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
    get flow() {
        return this.cflow;
    }
    ;
    set flow(flow) {
    }
    ;
    get dead() {
        return this.isDead;
    }
    ;
}
exports.Character = Character;
