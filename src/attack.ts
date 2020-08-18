import {Mod} from './mod';

export class Attack {
    name: string;

    mods: Array<Mod>;

    constructor (name: string, mods: Array<Mod> | Mod | null) {
        this.name = name;
    }
}