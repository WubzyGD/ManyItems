import {Attack} from './attack';

export class Weapon {
    name: string;

    mainAttack: Attack;
    attackParams: object;

    meta: object;



    constructor (name: string, mainAttack?: Attack, attackParams?: AttackParams, metaInfo?: MetaInfo) {
        this.name = name;
        if (mainAttack) {this.mainAttack = mainAttack;} else {this.mainAttack = null;}
        if (attackParams) {this.attackParams = attackParams;} else {this.attackParams = null;}
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



    private static verifyAttackParams(params: object, w: Weapon, full?: boolean): Weapon {
        if (full) {
            function verify (obj: object): obj is AttackParams {return 'canAttack' in obj}
            if (verify(params)) {w.attackParams = params;} else {throw new SyntaxError("Invalid 'attackParams' given.");}
        }

        return w;
    };

    private static verifyMetaInfo(params: object, w: Weapon, full?: boolean) {};



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
    durability?: number,
    maxRange?: number,
    statuses?: Effects | Effects_Obj,
    custom?: object
}

interface MetaInfo {}

let sword = new Weapon("Sword", new Attack("Stab")).setMeta({}).setAttackParams({});

console.log(sword, sword.metaInfo);