import { Durability } from "./durability";
import { Char } from "../char/char";
export declare class Item {
    name: string;
    id: string;
    heldBy: Char;
    durability: Durability;
    meta: any;
    constructor(name: string, id?: string);
}
