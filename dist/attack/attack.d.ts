import { Damage } from "./damage";
import { Player } from "../char/player";
export declare class Attack {
    name: string;
    damage: Damage;
    constructor(name: string, damage: number | Damage);
    attack(target: Player, damage?: number | Damage): Attack;
}
