export class HealthEffect {

    HPBonus: number = 0;
    forceHP: number = null;
    maxHPBonus: number = 0;
    forceHPMax: number = null;
    latticeBonus: number = 0;
    forceLattice: number = null;
    maxLatticeBonus: number = 0;
    forceLatticeMax: number = null;
    forceLatticeToggle: boolean = null;
    forceHPSpill: boolean = null;


    public setMaxHP(hp: number, mode?: "bonus" | "set"): HealthEffect {
        if (mode && mode === 'set') {this.forceHPMax = hp;}
        else {this.maxHPBonus = hp;}
        return this;
    }

    public setHP(hp: number, mode?: "bonus" | "set"): HealthEffect {
        if (mode && mode === 'set') {this.forceHP = hp;}
        else {this.HPBonus = hp;}
        return this;
    }

    public setLatticeMax(hp: number, mode?: "bonus" | "set"): HealthEffect {
        if (mode && mode === 'set') {this.forceLatticeMax = hp;}
        else {this.maxLatticeBonus = hp;}
        return this;
    }

    public setLattice(hp: number, mode?: "bonus" | "set"): HealthEffect {
        if (mode && mode === 'set') {this.forceLattice = hp;}
        else {this.latticeBonus = hp;}
        return this;
    }

}