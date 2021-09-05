"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lattice = void 0;
const util_1 = require("../../util/errors/util");
const char_1 = require("../../util/errors/char");
class Lattice {
    constructor(hp, hpSpill, enabled) {
        this.enabled = false;
        this.hpSpill = false;
        this.max = -1;
        this._hp = null;
        if (hp) {
            this._hp = hp;
        }
        if (typeof hpSpill === 'boolean') {
            this.hpSpill = hpSpill;
        }
        if (typeof enabled === 'boolean') {
            this.enabled = enabled;
        }
    }
    toggle(forceValue) {
        if (typeof forceValue === 'boolean') {
            this.enabled = forceValue;
        }
        else {
            this.enabled = !this.enabled;
        }
        this._hp = this.enabled ? 0 : null;
        return this;
    }
    toggleHPSpill(forceValue) {
        if (typeof forceValue === 'boolean') {
            this.hpSpill = forceValue;
        }
        else {
            this.hpSpill = !this.hpSpill;
        }
        return this;
    }
    toggleMax(forceValue) {
        this.max = typeof forceValue === 'boolean'
            ? forceValue
                ? -1 : 5
            : this.max === -1
                ? -1 : 5;
        return this;
    }
    setHP(lattice) {
        if (!this.enabled) {
            throw new char_1.HealthManagerError("You tried to set lattice points, but lattice isn't enabled. Use Lattice#toggleLattice() to enable it.", "LatticeError");
        }
        if (this.max && (lattice > this.max)) {
            this._hp = this.max;
        }
        else {
            this._hp = lattice;
        }
        return this;
    }
    setMax(maxLattice) {
        if (typeof maxLattice !== "number" || maxLattice < -1 || maxLattice === 0) {
            throw new util_1.ConstructorError(`maxLattice must be of type 'number', >= 1, and != 0 (-1 disables the feature). (Got ${maxLattice})`);
        }
        this.max = maxLattice;
        return this;
    }
    get hp() {
        return this._hp;
    }
}
exports.Lattice = Lattice;
