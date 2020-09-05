import { Random } from './random';
import { Character } from './char';
export declare class Mod {
    name: string;
    mainEffects: ModEffects;
    activateOn: ActivateOn;
    bonusAgainst: null | Array<string> | string;
    bonusEffects: ModEffects | null;
    slugAgainst: null | Array<string> | string;
    slugEffects: ModEffects | null;
    onBS: "default" | "disable";
    constructor(name: string, activateOn: ActivateOn, mainEffects: ModEffects, onBS: "default" | "disable", bonusAgainst?: null | Array<string> | string, bonusEffects?: ModEffects | null, slugAgainst?: null | Array<string>, slugEffects?: ModEffects | null);
    private cleanActivateOn;
    heartbeat(victim?: string | Character): HeartbeatResults;
    wakeup(target?: null | string | Character, force?: boolean): boolean;
    pulse(victim?: string | Character, calculate?: boolean): PulseResults;
    fullCalculate(alt: PulseResultsAlt): number;
    sweepStatuses(alt: PulseResultsAlt): string[];
    static sweepStatuses(statuses: Effects | Effects_Obj | false): string[];
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
interface RandomBubble {
    min: number;
    max: number;
}
interface RandomComplex {
    force: number;
    random: RandomBubble;
}
declare type Random_Obj = number | RandomBubble | RandomComplex;
interface ActivateOn {
    always?: boolean;
    chance?: number;
    bonus?: boolean;
    slug?: boolean;
    bonusChance?: number;
    slugChance?: number;
    mode?: "prioritize_bs" | "prioritize_base" | "merge" | "reroll" | "reroll_merge" | "pass_both";
}
interface ModEffects {
    damageAdd: Random | Random_Obj;
    multiplier?: Random | Random_Obj;
    multiplierAC?: number | false;
    statuses?: Effects | Effects_Obj;
    statusGrantChance?: number | false;
}
interface HeartbeatResults {
    hit: boolean;
    bonusHit: boolean;
    slugHit: boolean;
}
interface PulseEffectsResults {
    damageAdd: number;
    multiply: number;
    multiplied: boolean;
    statuses: Effects | Effects_Obj;
    statusesGranted: boolean;
    calculated?: {
        damage: number;
        statuses: Effects | Effects_Obj | false;
    };
}
interface PulseResultsAlt {
    main: PulseEffectsResults;
    bonus: PulseEffectsResults | null;
    slug: PulseEffectsResults | null;
    fullCalculate: Function;
    sweepStatuses: Function;
    calculated?: {
        statuses: Effects | Effects_Obj | false;
        damage: number;
    };
}
interface PulseResults {
    mod: Mod;
    awake: boolean;
    alt: PulseResultsAlt | null;
}
export {};
