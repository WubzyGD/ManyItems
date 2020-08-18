import {Attack} from './attack';

export class Weapon {
    name: string;

    mainAttack: Attack;
    attackParams: object;

    stats: object;

    meta: object;



    constructor (name: string, mainAttack?: Attack, attackParams?: AttackParams, metaInfo?: MetaInfo) {
        this.name = name;
        if (mainAttack) {this.mainAttack = mainAttack;} else {this.mainAttack = null;}
        if (attackParams) {this.attackParams = Weapon.verifyAttackParams(attackParams, this, true);} else {this.attackParams = null;}
        if (metaInfo) {this.meta = Weapon.verifyMetaInfo(metaInfo, this, true);} else {this.meta = null;}
    };



    public setMainAttack(attack: Attack): Weapon {
        this.mainAttack = attack;
        return this;
    };

    public setMetaInfo(meta: MetaInfo): Weapon {
        this.meta = meta;
        return this;
    }; public setMeta(meta: MetaInfo): Weapon {
        return this.setMetaInfo(meta);
    };

    public setAttackParams(params: AttackParams): Weapon {
        this.attackParams = params;
        return this;
    };



    public editStats(newStats: Stats, clearOld?: boolean): Weapon {
        return this;
    };



    private static verifyAttackParams(params: object, w: Weapon, full?: boolean): object {
        if (full) {
            function verify (obj: object): obj is AttackParams {return 'canAttack' in obj}
            if (verify(params)) {w.attackParams = params;} else {throw new SyntaxError("Invalid 'attackParams' given.");}
        }

        return params;
    };

    private static verifyMetaInfo(params: object, w: Weapon, full?: boolean): object {
        return params;
    };



    get metaInfo(): object {return this.meta};
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

interface AttackParams {
    canAttack: boolean,
    durability?: number | boolean,
    durabilityMode?: "percent" | "default" | "heap" | "state",
    maxRange?: number,
    statuses?: Effects | Effects_Obj,
    custom?: object
}

interface MetaInfo {}

interface Stats {
    isBroken?: true,
    custom?: object
}

let sword = new Weapon("Sword", new Attack("Stab"))
.setMeta({})
.setAttackParams({
    canAttack: true, durability: true, maxRange: 100, durabilityMode: "heap",
    statuses: {holder: null, victim: ["sliced"]},
    custom: {aCustomProperty: "Some Data!"}
})
.editStats({});

console.log(sword, sword.metaInfo);