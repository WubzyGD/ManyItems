import {Attack} from './attack';
import { Mod } from './mod';
import {Random} from './random';
import { Character } from './char';
import {dice} from "./util";

export class Weapon {
    name: string;

    mainAttack: Attack;
    attackParams: object;
    attacks: Array<Attack>;

    stats: object;

    meta: object;



    constructor (name: string, mainAttack?: Attack | null, attackParams?: AttackParams, attacks?: Array<Attack> | Attack | null, metaInfo?: MetaInfo, stats?: Stats) {
        this.name = name;
        if (mainAttack) {this.setMainAttack(mainAttack);} else {this.mainAttack = null;}
        if (attackParams) {this.attackParams = Weapon.verifyAttackParams(attackParams, this, true);} else {this.attackParams = null;}

        this.verifyAttacks(mainAttack, attacks);

        if (metaInfo) {this.meta = Weapon.verifyMetaInfo(metaInfo, this, true);} else {this.meta = null;}
    };



    public setMainAttack(attack: Attack | null): Weapon {
        if (!(attack instanceof Attack) && attack !== null) {console.log(attack); throw new SyntaxError("Weapon param 'mainAttack' must be an instance of class 'Attack'");}
        this.verifyAttacks(attack, this.attacks);
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

    public setAttacks(attacks: Array<Attack> | Attack | null): Weapon {
        this.attacks = this.verifyAttacks(this.mainAttack, attacks);
        return this;
    };

    public addAttack(attack: Attack): Weapon {
        this.verifyAttacks(this.mainAttack, this.attacks).push(attack);
        return this;
    };

    public editStats(newStats: Stats, clearOld?: boolean): Weapon {
        return this;
    };

    public attack(victim?: string | Character | null, attack?: Attack | null, returnAtR?: boolean): number | AttackResults {
        let damage: number = 0;
        let atk: AttackResults;
        if (!attack) {
            if (victim) {atk = this.mainAttack.attack(victim);}
            else {atk = this.mainAttack.attack();}
        } else {
            if (victim) {atk = attack.attack(victim);}
            else {atk = attack.attack();}
        }

        damage = atk.damage;

        if (returnAtR) {return atk;} else {return damage;}
    }



    private static verifyAttackParams(params: object, w: Weapon, full?: boolean): object {
        if (full) {
            function verify (obj: object): obj is AttackParams {return 'canAttack' in obj;}
            if (verify(params)) {w.attackParams = params;} else {throw new SyntaxError("Invalid 'attackParams' given.");}
        }

        return params;
    };

    private static verifyMetaInfo(params: object, w: Weapon, full?: boolean): object {
        if (full) {
            function verify (obj: object): obj is MetaInfo {return 'author' in obj || 'rarity' in obj;}
            if (verify(params)) {w.meta = params;} else {throw new SyntaxError("Invalid 'metaInfo' given.");}
        }

        return params;
    };

    private verifyAttacks(mainAttack: Attack | null, attacks: Array<Attack> | Attack | null): Array<Attack> {
        if (mainAttack === null && attacks) {throw new SyntaxError("Attack(s) given in Weapon constructor or setAttacks(), but no Main Attack is set. Make sure you designate a main attack in constructor or use setMainAttack().");}
        if (attacks && mainAttack) {
            if (Array.isArray(attacks)) {if (!attacks.includes(mainAttack)) {
                attacks.push(mainAttack);
                this.attacks = attacks;
            }} else {this.attacks = [mainAttack, attacks];}
        } else if (!attacks && mainAttack) {this.attacks = [mainAttack];}
        else {this.attackParams = {canAttack: false};}
        if (attacks instanceof Attack && !Array.isArray(attacks)) {this.attacks = [attacks];}

        return this.attacks;
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

interface MetaInfo {
    author?: string,
    rarity?: string
}

interface Stats {
    isBroken?: true,
    custom?: object
}

interface AttackResults {
    damage: number,
    statuses: string[],
    victim: string | null,
    attack: Attack
}



let sword = new Weapon("Sword")
.setMainAttack(new Attack("Stab", {baseDamage: 10}, [new Mod("Double", {chance: 25, bonusChance: 25, mode: "merge"}, {damageAdd: 0, multiplier: 2, multiplierAC: 100}, "default", ["Skeleton", "Zombie"], {damageAdd: 0})]))
.setAttackParams({canAttack: true, durability: true, maxRange: 20, statuses: "bleeding"})
.setMeta({author: "WubzyGD", rarity: "Common"})
.addAttack(new Attack("Slash", {baseDamage: 10}, null));

//console.log(sword);

/*console.log(sword.attack());
console.log(sword.attack(null, sword.mainAttack));
console.log(sword.attack(null, sword.attacks[1]));*/

//console.log("\n");

//console.log(dice.d4.roll());

let claws = new Weapon("Claws", new Attack("Slash", {baseDamage: dice.d6, statuses: "Slashing"}, [new Mod("Bleeding", {chance: 25}, {damageAdd: 4, statuses: "Bleeding"}, "default")]), {canAttack: true});
//console.log(claws.attack(), claws.attack(), claws.attack(), claws.attack(), claws.attack());
console.log(claws.attack(null, null, true));

/*let r = new Random("complex", null, {min: 5, max: 10}, {force: 2, random: {min: 5, max: 10}});

console.log(r.rand);*/