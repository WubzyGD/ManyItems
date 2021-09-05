"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthManager = void 0;
const char_1 = require("../../util/errors/char");
const lattice_1 = require("./lattice");
class HealthManager {
    constructor(health, options) {
        this.lattice = new lattice_1.Lattice();
        this.maxHealth = -1;
        this.maxHeal = -1;
        this.maxDamage = -1;
        this.maxLattice = -1;
        this._health = health;
        if (options) {
            if (options.maxHeal) {
                if (typeof options.maxHeal !== "number" || options.maxHeal < -1) {
                    throw new char_1.HealthManagerConstructorError(`options.maxHeal must be of type 'number' and >= 1 (-1 disables the feature). (Got ${options.maxHeal})`);
                }
                this.maxHeal = options.maxHeal;
            }
            if (options.maxHealth) {
                if (typeof options.maxHealth !== "number" || options.maxHealth < -1 || options.maxHealth === 0) {
                    throw new char_1.HealthManagerConstructorError(`options.maxHealth must be of type 'number', >= 1, and != 0 (-1 disables the feature). (Got ${options.maxHealth})`);
                }
                this.maxHealth = options.maxHealth;
            }
            if (options.maxDamage) {
                if (typeof options.maxDamage !== "number" || options.maxDamage < -1) {
                    throw new char_1.HealthManagerConstructorError(`options.maxDamage must be of type 'number' and >= 1 (-1 disables the feature). (Got ${options.maxDamage})`);
                }
                this.maxDamage = options.maxDamage;
            }
            if (options.maxLattice) {
                if (typeof options.maxLattice !== "number" || options.maxLattice < -1 || options.maxLattice === 0) {
                    throw new char_1.HealthManagerConstructorError(`options.maxLattice must be of type 'number', >= 1, and != 0 (-1 disables the feature). (Got ${options.maxLattice})`);
                }
                this.lattice.max = options.maxLattice;
            }
        }
    }
    setHealth(health) {
        this.health = health;
        return this;
    }
    heal(health) {
        this.health += health;
        return this;
    }
    damage(damage) {
        this.health -= damage;
        return this;
    }
    setMax(maximums) {
        Object.keys(maximums).forEach(p => {
            let prop = `max${p.slice(0, 1).toUpperCase()}${p.slice(1).toLowerCase()}`;
            if (typeof this[prop] !== "undefined") {
                if (prop === 'maxLattice') {
                    this.lattice.toggleMax(true).setMax(maximums.lattice);
                }
                else {
                    this[prop] = maximums[p];
                }
            }
        });
        return this;
    }
    set health(health) {
        let old = this._health;
        let healing = false;
        if (health > old && typeof this.maxHeal === 'number' && this.maxHeal !== -1 && (health - old > this.maxHeal)) {
            health = old + this.maxHeal;
            healing = true;
        }
        if (typeof this.maxHealth === "number" && this.maxHeal !== -1 && health > old && health > this.maxHealth) {
            if (this.lattice.enabled && this.lattice.hpSpill) {
                this.lattice.setHP(this.lattice.hp + (health - this.maxHealth));
            }
            health = this.maxHealth;
            healing = true;
        }
        if (!healing && health < old) {
            if (typeof this.maxDamage === 'number' && this.maxDamage !== -1 && (old - health) > this.maxDamage) {
                health = old - this.maxDamage;
            }
        }
        this._health = health;
    }
    get health() {
        return this._health;
    }
    get hp() { return this.health; }
}
exports.HealthManager = HealthManager;
