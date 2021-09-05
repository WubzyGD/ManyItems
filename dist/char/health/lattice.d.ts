export declare class Lattice {
    enabled: boolean;
    hpSpill: boolean;
    max: number;
    private _hp;
    constructor(hp?: number, hpSpill?: boolean, enabled?: boolean);
    toggle(forceValue?: boolean): Lattice;
    toggleHPSpill(forceValue?: boolean): Lattice;
    toggleMax(forceValue?: boolean): Lattice;
    setHP(lattice: number): Lattice;
    setMax(maxLattice: number): Lattice;
    get hp(): number;
}
