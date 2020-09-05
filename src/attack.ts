import {Mod} from './mod';
import { Character } from './char';
import {Random} from "./random";

export class Attack {
    name: string;

    baseInfo: AttackBaseInfo;

    mods: Array<Mod> | null;

    castText: string;

    constructor (name: string, baseInfo: AttackBaseInfo, mods: Array<Mod> | Mod | null, castText?: string, ) {
        this.name = name;

        this.baseInfo = baseInfo;

        if (!Array.isArray(mods)) {mods = [mods];}
        this.mods = mods;

        this.castText = castText;
    }

    public attack(victim?: string | Character): AttackResults {
        let results: AttackResults = {
            damage: 0, 
            statuses: [], 
            victim: null, 
            attack: this
        };
        let damage = 0;

        if (this.baseInfo.baseDamage instanceof Random) {damage += this.baseInfo.baseDamage.calc();}
        else {damage += this.baseInfo.baseDamage;}

        if (this.mods) {
            let modInfo = [];
            for (let mod of this.mods) {if (mod) {if (victim) {modInfo.push(mod.pulse(victim));} else {modInfo.push(mod.pulse());}}}
            for (let mod of modInfo) {
                if (mod !== null && mod.alt !== null) {
                    damage += mod.alt.fullCalculate();
                    for (let s of mod.alt.sweepStatuses()) {
                        results.statuses.push(s);
                    }
                    results.statuses = Mod.sweepStatuses(results.statuses);
                }
            }
        }
        if (this.baseInfo.healing == true) {damage *= -1;}
        if (this.baseInfo.statuses && typeof this.baseInfo.statuses !== "object") {
            if (typeof this.baseInfo.statuses == "string") {this.baseInfo.statuses = [this.baseInfo.statuses];}
            for (let s of this.baseInfo.statuses) {results.statuses.push(s);}
            results.statuses = Mod.sweepStatuses(results.statuses);
        }

        results.damage = damage;
        if (!victim) {results.victim = null;}
        else if (victim instanceof Character) {results.victim = victim.name;}
        else {results.victim = victim}

        return results;
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

interface AttackBaseInfo {
    baseDamage: number | Random,
    healing?: boolean,
    hitType?: string,
    statuses?: Effects | Effects_Obj
}

interface AttackResults {
    damage: number,
    statuses: string[],
    victim: string | null,
    attack: Attack
}