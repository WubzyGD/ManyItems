import { Mod } from './mod';
export declare class Attack {
    name: string;
    mods: Array<Mod>;
    constructor(name: string, mods: Array<Mod> | Mod | null);
}
