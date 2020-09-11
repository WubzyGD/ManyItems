import { Mod } from './mod';
import { Character } from './char';
import { Random } from "./random";
export declare class Attack {
    /**
     * Attack controls all forms of attacking
     * This includes healing
     *
     * @constructor
     * @param name {string} A string showing the display name of the weapon
     * @param baseInfo {AttackBaseInfo} object describing the standard behavior of the attack without any mods.
     */
    name: string;
    baseInfo: AttackBaseInfo;
    mods: Array<Mod> | null;
    castText: string;
    constructor(name: string, baseInfo: AttackBaseInfo, mods: Array<Mod> | Mod | null, castText?: string);
    attack(victim?: string | Character): AttackResults;
    public: any;
}
declare type Effects = string | Array<string> | null;
interface Effects_Obj {
    victim?: Effects;
    target?: Effects;
    caster?: Effects;
    user?: Effects;
    holder?: Effects;
    all?: Effects;
}
interface AttackBaseInfo {
    baseDamage: number | Random;
    healing?: boolean;
    hitType?: string;
    statuses?: Effects | Effects_Obj;
}
interface AttackResults {
    damage: number;
    statuses: string[];
    victim: string | null;
    attack: Attack;
}
export {};
