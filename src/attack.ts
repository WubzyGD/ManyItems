import {Mod} from './mod';

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

    get attack(): AttackResults {
        let results = {};
        let damage = 0;

        damage += this.baseInfo.baseDamage;

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
    baseDamage: number,
    healing?: boolean,
    hitType?: string,
    statuses?: Effects | Effects_Obj
}

interface AttackResults {

}