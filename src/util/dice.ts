import {Random} from "./random";

export class Die {
    sides: number;
    constructor(sides: number) {this.sides = sides;}
    public roll(modifier?: number): number {return (Random.calc_int(this.sides) + (modifier ? modifier : 0));}
}

export const Dice = {
    d4: new Die(4),
    d6: new Die(6),
    d8: new Die(8),
    d10: new Die(10),
    d12: new Die(12),
    d20: new Die(20),
    d100: new Die(100)
};