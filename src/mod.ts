import {Random} from './random';
import {Character} from './char';

export class Mod {
    name: string;

    mainEffects: ModEffects;

    activateOn: ActivateOn;

    bonusAgainst: null | Array<string> | string;
    bonusEffects: ModEffects | null;
    slugAgainst: null | Array<string> | string;
    slugEffects: ModEffects | null;

    onBS: "default" | "disable";



    constructor (name: string, activateOn: ActivateOn, mainEffects: ModEffects, onBS: "default" | "disable", bonusAgainst?: null | Array<string> | string, bonusEffects?: ModEffects | null, slugAgainst?: null | Array<string>, slugEffects?: ModEffects | null) {
        this.name = name;
        this.activateOn = activateOn;
        this.mainEffects = mainEffects;
        this.onBS = onBS;

        if ((bonusAgainst !== null && bonusAgainst !== undefined) && (bonusEffects == null || bonusEffects == undefined)) {
            throw new SyntaxError("Error in Mod class construction: 'bonusAgainst' is given, but no 'bonusEffects' are specified.");
        } else { if (bonusAgainst !== undefined) {
            this.bonusAgainst = bonusAgainst;
            this.bonusEffects = bonusEffects;
        }}

        if ((slugAgainst !== null && slugAgainst !== undefined) && (slugEffects == null || slugEffects == undefined)) {
            throw new SyntaxError("Error in Mod class construction: 'slugAgainst' is given, but no 'slugEffects' are specified.");
        } else { if (slugAgainst !== undefined) {
            this.slugAgainst = slugAgainst;
            this.slugEffects = slugEffects;
        }}
    };



    private cleanActivateOn(): ActivateOn {
        return this.activateOn;
    };



    public heartbeat(victim?: string | Character): HeartbeatResults {
        if (this.activateOn.always === true) {return {hit: true, slugHit: false, bonusHit: false};}
        if (!victim || this.activateOn.mode == "prioritize_base") {
            if (typeof(this.activateOn.chance) == "number") {
                if (Math.ceil(Math.random() * this.activateOn.chance) <= this.activateOn.chance) {return {hit: true, slugHit: false, bonusHit: false};}
            }
        } else {
            var mainChance: number; var bonusChance: number; var slugChance: number;
            if (typeof(this.activateOn.chance) == "number") {mainChance = Math.ceil(Math.random() * 100);}
            if (typeof(this.activateOn.bonusChance) == "number") {bonusChance = Math.ceil(Math.random() * 100);} else {bonusChance = 100;}
            if (typeof(this.activateOn.slugChance) == "number") {slugChance = Math.ceil(Math.random() * 100);} else {bonusChance = 100;}

            if (mainChance > this.activateOn.chance && (this.activateOn.mode !== "prioritize_bs" && this.activateOn.mode !== "reroll" && this.activateOn.mode !== "reroll_merge")) {return {hit: false, bonusHit: false, slugHit: false};}

            let bonusHit: boolean = false;
            let slugHit: boolean = false;

            if (victim instanceof Character) {if (this.bonusAgainst.includes(victim.name.toLowerCase())) {bonusHit = true} else {bonusHit = false;}}
            else if (typeof victim == "string") {if (this.bonusAgainst.includes(victim.toLowerCase())) {bonusHit = true} else {bonusHit = false;}}
            else {throw new SyntaxError("Error in Mod heartbeat: Param 'victim' was not either a string or Character");}

            if (victim instanceof Character) {if (this.slugAgainst.includes(victim.name.toLowerCase())) {slugHit = true} else {slugHit = false;}}
            else if (typeof victim == "string") {if (this.slugAgainst.includes(victim.toLowerCase())) {slugHit = true} else {slugHit = false;}}
            else {throw new SyntaxError("Error in Mod heartbeat: Param 'victim' was not either a string or Character");}

            if (bonusHit) {
                if (this.activateOn.bonus === false) {bonusHit = false;}
                else if (typeof this.activateOn.bonusChance == "number") {if (bonusChance > this.activateOn.bonusChance) {bonusHit = false;}}
            }
            if (slugHit) {
                if (this.activateOn.slug === false) {slugHit = false;}
                if (typeof this.activateOn.slugChance == "number") {if (slugChance > this.activateOn.slugChance) {slugHit = false;}}
            }

            function specialHit(type: "slug" | "bonus", mod: Mod): HeartbeatResults {
                function sv (type: "slug" | "bonus") {
                    let t = {hit: true, slugHit: false, bonusHit: false};
                    t[`${type}Hit`] = true;
                    return t;
                };

                if (mod.activateOn.mode == "merge") {
                    if (Math.ceil(Math.random() * 100) <= mod.activateOn.chance + mod.activateOn[`${type}Chance`]) {
                        return sv(type);
                    }
                } else if (mod.activateOn.mode == "prioritize_bs") {if (Math.ceil(Math.random() * 100) <= mod.activateOn[`${type}Chance`]) {
                    return sv(type);
                }} else if (mod.activateOn.mode == "reroll") {
                    var sc: number;
                    if (type == "slug") {sc = slugChance;}
                    else {sc = bonusChance;}
                    if (mainChance <= mod.activateOn.chance) {
                        return sv(type);
                    } else if (sc <= mod.activateOn[`${type}Chance`]) {
                        return sv(type);
                    } else {return {hit: false, slugHit: false, bonusHit: false};}
                } else if (mod.activateOn.mode == "reroll_merge") {
                    if (Math.ceil(Math.random() * 100) <= mod.activateOn.chance + mod.activateOn[`${type}Chance`]) {
                        return sv(type);
                    } else if (Math.ceil(Math.random() * 100) <= mod.activateOn.chance + mod.activateOn[`${type}Chance`]) {
                        return sv(type);
                    } else {return {hit: false, slugHit: false, bonusHit: false};}
                } else if (mod.activateOn.mode == "pass_both") {
                    if (Math.ceil(Math.random() * 100) <= mod.activateOn[`${type}Chance`] && mainChance <= mod.activateOn.chance) {return sv(type);}
                    else {return {hit: false, slugHit: false, bonusHit: false};}
                }
            };

            if (bonusHit) {return specialHit("bonus", this);} else if (slugHit) {return specialHit("slug", this);}
            else {return {hit: true, slugHit: false, bonusHit: false};}
        }
    };
    
    public wakeup() {
        
    };
    
    public pulse(victim?: string | Character): PulseResults {
        let results: PulseResults = {mod: this, awake: false, alt: null};
        
        if (this.pulse(victim)) {

        }

        return results;
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
    chance?: number,
    bonus?: boolean,
    slug?: boolean,
    bonusChance?: number,
    slugChance?: number,
    mode?: "prioritize_bs" | "prioritize_base" | "merge" | "reroll" | "reroll_merge" | "pass_both"
}

interface ModEffects {
    damageAdd: Random | Random_Obj,
    multiplier?: Random | Random_Obj,
    multiplierAC?: number | false,
    statuses?: Effects | Effects_Obj,
    statusGrantChance?: number | false
}

interface HeartbeatResults {
    hit: boolean,
    bonusHit: boolean,
    slugHit: boolean
}

interface WakeupResults {}

interface PulseResults {
    mod: Mod,
    awake: boolean,
    alt: {

    } | null
}





let ex1 = new Mod("Example1", {always: true}, {damageAdd: 5}, "default");

console.log(ex1.heartbeat());