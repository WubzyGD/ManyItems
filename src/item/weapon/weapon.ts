import {Item} from "../item";
import {Damage} from "../../attack/damage";

export class Weapon extends Item {
    damage: Damage; //TODO advanced damage
    type: string; //TODO weapon types


    constructor(name: string, damage: number | Damage, type: string, id?: string) {
        super(name, id);

        this.damage = damage instanceof Damage ? damage : new Damage(damage);
        this.type = type;
    }



    //TODO attacks

    //TODO weapon meta
}