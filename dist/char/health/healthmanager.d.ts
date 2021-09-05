import { Lattice } from "./lattice";
export declare class HealthManager {
    lattice: Lattice;
    maxHealth: number;
    maxHeal: number;
    maxDamage: number;
    maxLattice: number;
    private _health;
    constructor(health: number, options?: HealthManagerOptions);
    setHealth(health: number): HealthManager;
    heal(health: number): HealthManager;
    damage(damage: number): HealthManager;
    setMax(maximums: {
        health?: number;
        heal?: number;
        damage?: number;
        lattice?: number;
    }): HealthManager;
    set health(health: number);
    get health(): number;
    get hp(): number;
}
interface HealthManagerOptions {
    maxHealth?: number;
    lattice?: number;
    maxLattice?: number;
    maxHeal?: number;
    maxDamage?: number;
}
export {};
