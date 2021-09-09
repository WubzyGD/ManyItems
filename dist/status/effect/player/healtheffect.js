"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthEffect = void 0;
class HealthEffect {
    constructor() {
        this.HPBonus = 0;
        this.forceHP = null;
        this.maxHPBonus = 0;
        this.forceHPMax = null;
        this.latticeBonus = 0;
        this.forceLattice = null;
        this.maxLatticeBonus = 0;
        this.forceLatticeMax = null;
        this.forceLatticeToggle = null;
        this.forceHPSpill = null;
    }
    setMaxHP(hp, mode) {
        if (mode && mode === 'set') {
            this.forceHPMax = hp;
        }
        else {
            this.maxHPBonus = hp;
        }
        return this;
    }
    setHP(hp, mode) {
        if (mode && mode === 'set') {
            this.forceHP = hp;
        }
        else {
            this.HPBonus = hp;
        }
        return this;
    }
    setLatticeMax(hp, mode) {
        if (mode && mode === 'set') {
            this.forceLatticeMax = hp;
        }
        else {
            this.maxLatticeBonus = hp;
        }
        return this;
    }
    setLattice(hp, mode) {
        if (mode && mode === 'set') {
            this.forceLattice = hp;
        }
        else {
            this.latticeBonus = hp;
        }
        return this;
    }
}
exports.HealthEffect = HealthEffect;
