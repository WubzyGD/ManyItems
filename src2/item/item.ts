import { Durability } from "./util/durability/durability";

export class Item {

    name: string;
    id: string = '';
    heldBy: any; //TODO add player master class
    durability: Durability;
    meta: any; //TODO add item meta



    constructor(name: string, options?: ItemOptions) { //TODO finish constructor elements
        this.name = name;
        this.id = options && options.id && options.id.length ? options.id : this.id;
        if (options && options.heldBy) {this.heldBy = options.heldBy;}
        if (options && options.durability) {this.durability = options.durability;}
    }



    //TODO add durability handling

    //TODO add meta handling

    //TODO add owner handling

}

export interface ItemOptions {
    id?: string
    heldBy?: any, //TODO die inside
    durability?: Durability
}