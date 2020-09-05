import { Mod } from './mod';
import { Character } from './char';
export declare class Attack {
    name: string;
    baseInfo: AttackBaseInfo;
    mods: Array<Mod> | null;
    castText: string;
    constructor(name: string, baseInfo: AttackBaseInfo, mods: Array<Mod> | Mod | null, castText?: string);
    attack(victim?: string | Character): AttackResults;
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
    baseDamage: number;
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
