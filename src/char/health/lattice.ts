import {ConstructorError} from "../../util/errors/util";
import {HealthManagerError} from "../../util/errors/char";

export class Lattice {

    enabled: boolean = false;
    hpSpill: boolean = false;
    max: number = -1;

    private _hp: number = null;


    constructor(hp?: number, hpSpill?: boolean, enabled?: boolean) {
        if (hp) {this._hp = hp;}
        if (typeof hpSpill === 'boolean') {this.hpSpill = hpSpill;}
        if (typeof enabled === 'boolean') {this.enabled = enabled;}
    }



    public toggle(forceValue?: boolean): Lattice {
        if (typeof forceValue === 'boolean') {this.enabled = forceValue;}
        else {this.enabled = !this.enabled;}
        this._hp = this.enabled ? 0 : null;
        return this;
    }

    public toggleHPSpill(forceValue?: boolean): Lattice {
        if (typeof forceValue === 'boolean') {this.hpSpill = forceValue;}
        else {this.hpSpill = !this.hpSpill;}
        return this;
    }

    public toggleMax(forceValue?: boolean): Lattice {
        this.max = typeof forceValue === 'boolean'
            ? forceValue
                ? -1 : 5
            : this.max === -1
                ? -1 : 5;
        return this;
    }

    public setHP(lattice: number): Lattice {
        if (!this.enabled) {throw new HealthManagerError("You tried to set lattice points, but lattice isn't enabled. Use Lattice#toggleLattice() to enable it.", "LatticeError");}
        if (this.max && (lattice > this.max)) {this._hp = this.max;}
        else {this._hp = lattice;}
        return this;
    }

    public setMax(maxLattice: number): Lattice {
        if (typeof maxLattice !== "number" || maxLattice < -1 || maxLattice === 0) {throw new ConstructorError(`maxLattice must be of type 'number', >= 1, and != 0 (-1 disables the feature). (Got ${maxLattice})`);}
        this.max = maxLattice;
        return this;
    }


    get hp(): number {
        return this._hp;
    }

}