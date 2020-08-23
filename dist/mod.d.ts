import { Random } from './random';
export declare class Mod {
    name: string;
    mainEffects: object;
    buffEffects: object;
    slugEffects: object;
    activateOn: object;
    buffAgainst: null | Array<string> | string;
    slugAgainst: null | Array<string> | string;
    constructor(name: string, activateOn: ActivateOn, mainEffects: MainEffects, onBS: "default" | "disable");
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
interface ActivateOn {
    always?: boolean;
    chance?: Random;
    bonus?: boolean | number;
    slug?: boolean | number;
    bonusChance?: Random;
    slugChance?: Random;
    mode?: "prioritize_sb" | "prioritize_base" | "merge" | "reroll" | "reroll_merge";
}
interface MainEffects {
    damageAdd: Random;
    multiplier?: Random;
    multiplierAC?: Random;
    statuses?: Effects | Effects_Obj;
    statusGrantChance?: Random;
}
export {};
