import {Random} from './random';

export class Mod {
    name: string;

    mainEffects: object;
    buffEffects: object;
    slugEffects: object;

    activateOn: object;

    buffAgainst: null | Array<string> | string;
    slugAgainst: null | Array<string> | string;



    constructor (name: string, activateOn: ActivateOn, mainEffects: MainEffects, onBS: "default" | "disable") {
        this.name = name;
        this.activateOn = activateOn;
    };
}

type Effects = string | Array<string> | null;

interface Effects_Obj {
    victim?: Effects,
    target?: Effects,

    caster?: Effects,
    user?: Effects,
    holder?: Effects,

    all?: Effects
}

interface RandomBubble {
    min: number,
    max: number
}

interface RandomComplex {
    force: number,
    random: RandomBubble,
}

type Random_Obj = number | RandomBubble | RandomComplex;

interface ActivateOn {
    always?: boolean,
    chance?: Random | Random_Obj,
    bonus?: boolean | number,
    slug?: boolean | number,
    bonusChance?: Random | Random_Obj,
    slugChance?: Random | Random_Obj,
    mode?: "prioritize_sb" | "prioritize_base" | "merge" | "reroll" | "reroll_merge"
}

interface MainEffects {
    damageAdd: Random | Random_Obj,
    multiplier?: Random | Random_Obj,
    multiplierAC?: Random | Random_Obj,
    statuses?: Effects | Effects_Obj,
    statusGrantChance?: Random | Random_Obj
}





/*let ex1 = new Mod("Example1", {
    chance: 40, mode: "reroll_merge", 
    bonusChance: {
        force: 5,
        random: {min: 5, max: 10}
    }, slugChance: {
        force: 5,
        random: {min: 5, max: 10}
    }}, {damageAdd: 10, multiplier: 1.5, multiplierAC: 10}, "default");

console.log(ex1);*/