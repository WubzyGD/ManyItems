import {Item} from "../item";

export class Weapon extends Item {
    damage: number; //TODO advanced damage
    type: string; //TODO weapon types



    constructor(name: string, damage: number, type: string, id?: string) {
        super(name, id);

        this.damage = damage;
        this.type = type;
    }



    //TODO attacks

    //TODO weapon meta
}