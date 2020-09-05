import { Attack } from './attack';
import { Character } from './char';
export declare class Weapon {
    name: string;
    mainAttack: Attack;
    attackParams: object;
    attacks: Array<Attack>;
    stats: object;
    meta: object;
    constructor(name: string, mainAttack?: Attack | null, attackParams?: AttackParams, attacks?: Array<Attack> | Attack | null, metaInfo?: MetaInfo, stats?: Stats);
    setMainAttack(attack: Attack | null): Weapon;
    setMetaInfo(meta: MetaInfo): Weapon;
    setMeta(meta: MetaInfo): Weapon;
    setAttackParams(params: AttackParams): Weapon;
    setAttacks(attacks: Array<Attack> | Attack | null): Weapon;
    addAttack(attack: Attack): Weapon;
    editStats(newStats: Stats, clearOld?: boolean): Weapon;
    attack(victim?: string | Character | null, attack?: Attack | null, returnAtR?: boolean): number | AttackResults;
    private static verifyAttackParams;
    private static verifyMetaInfo;
    private verifyAttacks;
    get metaInfo(): object;
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
interface AttackParams {
    canAttack: boolean;
    durability?: number | boolean;
    durabilityMode?: "percent" | "default" | "heap" | "state";
    maxRange?: number;
    statuses?: Effects | Effects_Obj;
    custom?: object;
}
interface MetaInfo {
    author?: string;
    rarity?: string;
}
interface Stats {
    isBroken?: true;
    custom?: object;
}
interface AttackResults {
    damage: number;
    statuses: string[];
    victim: string | null;
    attack: Attack;
}
export {};
