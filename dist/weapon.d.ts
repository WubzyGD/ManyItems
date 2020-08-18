import { Attack } from './attack';
export declare class Weapon {
    name: string;
    mainAttack: Attack;
    attackParams: object;
    stats: object;
    meta: object;
    constructor(name: string, mainAttack?: Attack, attackParams?: AttackParams, metaInfo?: MetaInfo);
    setMainAttack(attack: Attack): Weapon;
    setMetaInfo(meta: MetaInfo): Weapon;
    setMeta(meta: MetaInfo): Weapon;
    setAttackParams(params: AttackParams): Weapon;
    editStats(newStats: Stats, clearOld?: boolean): Weapon;
    private static verifyAttackParams;
    private static verifyMetaInfo;
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
}
interface Stats {
    isBroken?: true;
    custom?: object;
}
export {};
