export declare class HealthManager {
    private _health;
    private _lattice;
    maxHealth: number;
    maxHeal: number;
    maxDamage: number;
    maxLattice: number;
    constructor(health: number, options?: HealthManagerOptions);
    toggleLattice(forceValue?: boolean): HealthManager;
    setHealth(health: number): HealthManager;
    heal(health: number): HealthManager;
    damage(damage: number): HealthManager;
    setLattice(lattice: number): HealthManager;
    setMax(maximums: {
        health?: number;
        heal?: number;
        damage?: number;
        lattice?: number;
    }): HealthManager;
    set health(health: number);
    get health(): number;
    get lattice(): Lattice;
    get hp(): number;
}
interface HealthManagerOptions {
    maxHealth?: number;
    lattice?: number;
    maxLattice?: number;
    maxHeal?: number;
    maxDamage?: number;
}
interface Lattice {
    enabled: boolean;
    hp: number;
    hpSpill: boolean;
}
export {};
