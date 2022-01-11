import { Item } from "../item";
import { Damage } from "../../attack/damage";
export declare class Weapon extends Item {
    damage: Damage;
    type: string;
    constructor(name: string, damage: number | Damage, type: string, id?: string);
}
