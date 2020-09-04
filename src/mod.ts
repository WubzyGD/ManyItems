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

        if ((bonusAgainst !== null && bonusAgainst !== undefined) && (bonusEffects == null)) {
            throw new SyntaxError("Error in Mod class construction: 'bonusAgainst' is given, but no 'bonusEffects' are specified.");
        } else { if (bonusAgainst !== undefined) {
            this.bonusAgainst = bonusAgainst;
            this.bonusEffects = bonusEffects;
        }}

        if ((slugAgainst !== null && slugAgainst !== undefined) && (slugEffects == null)) {
            throw new SyntaxError("Error in Mod class construction: 'slugAgainst' is given, but no 'slugEffects' are specified.");
        } else { if (slugAgainst !== undefined) {
            this.slugAgainst = slugAgainst;
            this.slugEffects = slugEffects;
        }}

        if (!Object.keys(this.activateOn).includes("mode")) {this.activateOn.mode = "merge";}
    };



    private cleanActivateOn(): ActivateOn {
        return this.activateOn;
    };



    public heartbeat(victim?: string | Character): HeartbeatResults {
        if (this.activateOn.always === true) {return {hit: true, slugHit: false, bonusHit: false};}
        if (!victim || this.activateOn.mode == "prioritize_base") {
            if (typeof(this.activateOn.chance) == "number") {
                return {hit: Math.ceil(Math.random() * 100) <= this.activateOn.chance, slugHit: false, bonusHit: false};
            }
        } else {
            var mainChance: number; var bonusChance: number; var slugChance: number;
            if (typeof(this.activateOn.chance) == "number") {mainChance = Math.ceil(Math.random() * 100);}
            if (typeof(this.activateOn.bonusChance) == "number") {bonusChance = Math.ceil(Math.random() * 100);} else {bonusChance = 100;}
            if (typeof(this.activateOn.slugChance) == "number") {slugChance = Math.ceil(Math.random() * 100);} else {bonusChance = 100;}

            if (mainChance > this.activateOn.chance && (this.activateOn.mode !== "prioritize_bs" && this.activateOn.mode !== "reroll" && this.activateOn.mode !== "reroll_merge")) {return {hit: false, bonusHit: false, slugHit: false};}

            let bonusHit: boolean = false;
            let slugHit: boolean = false;

            if (victim instanceof Character) {bonusHit = this.bonusAgainst.includes(victim.name.toLowerCase());}
            else if (typeof victim == "string") {bonusHit = this.bonusAgainst.includes(victim.toLowerCase());}
            else {throw new SyntaxError("Error in Mod heartbeat: Param 'victim' was not either a string or Character");}

            if (victim instanceof Character) {slugHit = this.slugAgainst.includes(victim.name.toLowerCase());}
            else if (typeof victim == "string") {slugHit = this.slugAgainst.includes(victim.toLowerCase());}
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
                }

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
            }

            if (bonusHit) {return specialHit("bonus", this);} else if (slugHit) {return specialHit("slug", this);}
            else {return {hit: true, slugHit: false, bonusHit: false};}
        }
    };
    
    public wakeup(target?: null | string | Character, force?: boolean): boolean {
        if (force) {return true;}
        if (target) {return this.heartbeat(target).hit;}
        return this.heartbeat().hit;
    };

    public pulse(victim?: string | Character, calculate?: boolean): PulseResults {
        let results: PulseResults = {mod: this, awake: false, alt: null};

        if (victim) {var woke = this.heartbeat(victim);}
        else {var woke = this.heartbeat();}

        if (woke.hit) {
            var bonusDt: PulseEffectsResults | null;
            var slugDt: PulseEffectsResults | null;

            results.awake = true;

            function calc(t: "slug" | "bonus" | "main", mod: Mod): PulseEffectsResults {
                var res: PulseEffectsResults = {damageAdd: 0, statusesGranted: false, statuses: [], multiplied: false, multiply: 1};

                if (mod[`${t}Effects`].damageAdd instanceof Random) {
                    res.damageAdd = mod[`${t}Effects`].damageAdd.calc();
                } else if (typeof mod[`${t}Effects`].damageAdd == "number") {
                    res.multiply = mod[`${t}Effects`].damageAdd;
                } else {res.damageAdd = Random.from(mod[`${t}Effects`].damageAdd).calc();}

                if (mod[`${t}Effects`].multiplier) {if (mod[`${t}Effects`].multiplier instanceof Random) {
                    res.multiply = mod[`${t}Effects`].multiplier.calc();
                } else if (typeof mod[`${t}Effects`].multiplier == "number") {
                    res.multiply = mod[`${t}Effects`].multiplier;
                } else {res.multiply = Random.from(mod[`${t}Effects`].multiplier).calc();}}

                if (mod[`${t}Effects`].multiplierAC) {res.multiplied = Math.ceil(Math.random() * 100) <= mod[`${t}Effects`].multiplierAC;}
                else {res.multiplied = true;}

                res.statuses = mod[`${t}Effects`].statuses;
                if (mod[`${t}Effects`].statuses) {res.statusesGranted = Math.ceil(Math.random() * 100) <= mod[`${t}Effects`].statusGrantChance;}
                else {res.statusesGranted = false;}

                return res;
            }

            let mainDt = calc('main', this);
            if (woke.bonusHit === true) {bonusDt = calc('bonus', this);} else {bonusDt = null;
            if (woke.slugHit === true) {slugDt = calc('slug', this);} else {slugDt = null;}}
            results.alt = {
                main: mainDt,
                bonus: bonusDt,
                slug: slugDt,
                fullCalculate: function(): number {
                    return results.mod.fullCalculate(results.alt);
                },
                sweepStats: function(): Effects | Effects_Obj | false {
                    return results.mod.sweepStatuses(results.alt);
                }
            };

            if (calculate === true) {
                results.alt.calculated = {
                    statuses: results.mod.sweepStatuses(results.alt),
                    damage: results.mod.fullCalculate(results.alt)
                };
            }

        } else {results.awake = false;}

        return results;
    };

    public fullCalculate(alt: PulseResultsAlt): number {
        let total: number = 0;
        if (this.onBS == "default") {
            total += alt.main.damageAdd;
        }
        if (alt.bonus) {
            total += alt.bonus.damageAdd;
            if (alt.bonus.multiplied) {total *= alt.main.multiply;}
        } else if (alt.slug) {
            total += alt.slug.damageAdd;
            if (alt.slug.multiplied) {total *= alt.slug.multiply;}
        }

        if (this.onBS == "default") {if (alt.main.multiplied) {total *= alt.main.multiply;}}

        return total;
    };

    public sweepStatuses(alt: PulseResultsAlt): string[] {
        let stats: string[];
        if (alt.main.statusesGranted && this.onBS == "default") {
            if (Array.isArray(alt.main.statuses)) {for (let s of alt.main.statuses) {stats.push(s);}}
            else if (typeof alt.main.statuses == "string") {stats.push(alt.main.statuses);}
        }
        if (alt.bonus.statusesGranted) {
            if (Array.isArray(alt.bonus.statuses)) {for (let s of alt.bonus.statuses) {stats.push(s);}}
            else if (typeof alt.bonus.statuses == "string") {stats.push(alt.bonus.statuses);}
        } else if (alt.slug.statusesGranted) {
            if (Array.isArray(alt.slug.statuses)) {for (let s of alt.slug.statuses) {stats.push(s);}}
            else if (typeof alt.slug.statuses == "string") {stats.push(alt.slug.statuses);}
        }

        let temps: string[] = [];
        for (let stat of stats) {
            if (!temps.includes(stat)) {temps.push(stat);}
        }
        stats = temps;

        return stats;
    }



    public static sweepStatuses(statuses: Effects | Effects_Obj | false): string[] {
        let stats: string[];
        if (!statuses) {return [];}

        let temps: string[] = [];
        for (let stat of stats) {
            if (!temps.includes(stat)) {temps.push(stat);}
        }
        stats = temps;

        return stats;
    }

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

interface PulseEffectsResults {
    damageAdd: number,
    multiply: number,
    multiplied: boolean,
    statuses: Effects | Effects_Obj,
    statusesGranted: boolean,
    calculated?: {
        damage: number,
        statuses: Effects | Effects_Obj | false
    },
}

interface PulseResultsAlt {
    main: PulseEffectsResults,
    bonus: PulseEffectsResults | null,
    slug: PulseEffectsResults | null,
    fullCalculate: Function,
    sweepStats: Function,
    calculated?: {
        statuses: Effects | Effects_Obj | false,
        damage: number
    }
}

interface PulseResults {
    mod: Mod,
    awake: boolean,
    alt: PulseResultsAlt | null
}