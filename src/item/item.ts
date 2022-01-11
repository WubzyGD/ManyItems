import {Durability} from "./durability";
import {Char} from "../char/char";

export class Item {
    name: string;
    id: string = '';
    heldBy: Char
    durability: Durability;
    meta: any; //TODO add item meta



    constructor(name: string, id?: string) { //TODO finish constructor elements
        this.name = name;
        this.id = id || this.id;
    }



    //TODO add durability handling

    //TODO add meta handling

    //TODO add owner handling
}

interface ItemOptions {
    id: string
    heldBy: Char,
    durability: Durability
}