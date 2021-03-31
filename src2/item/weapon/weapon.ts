import {ItemOptions} from "../../../src/item";
import {Item} from "../item";
import {Durability} from "../util/durability/durability";

export class Weapon extends Item {

    damage: number; //TODO advanced damage
    type: string; //TODO weapon types



    constructor(name: string, damage: number, type: string, options?: WeaponOptions) {
        super(name, options);

        this.damage = damage;
        this.type = type;
    }



    //TODO attacks

    //TODO weapon meta

}



interface WeaponOptions extends ItemOptions {
    heldBy?: any,
    durability?: Durability,
    id?: string,
}