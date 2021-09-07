export declare class HealthEffect {
    HPBonus: number;
    forceHP: number;
    maxHPBonus: number;
    forceHPMax: number;
    latticeBonus: number;
    forceLattice: number;
    maxLatticeBonus: number;
    forceLatticeMax: number;
    forceLatticeToggle: boolean;
    forceHPSpill: boolean;
    setMaxHP(hp: number, mode?: "bonus" | "set"): HealthEffect;
    setHP(hp: number, mode?: "bonus" | "set"): HealthEffect;
    setLatticeMax(hp: number, mode?: "bonus" | "set"): HealthEffect;
    setLattice(hp: number, mode?: "bonus" | "set"): HealthEffect;
}
