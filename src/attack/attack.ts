import {DamageHandler} from "..";
import {AttackModifierManager} from "../manager/modifier/attackmodifier";

export class Attack {

    name: string;
    id: string;

    meta: AttackMeta;
    damage: DamageHandler;
    extra: AttackExtra;

    modifiers: AttackModifierManager;



    constructor(name: string, damage: DamageHandler, options?: AttackOptions) {
        this.name = name;
        this.damage = damage;

        options = options && Object.keys(options).length ? options : {};
        this.meta = options.meta || null;
        this.modifiers = options.modifiers || null;
        this.id = options.id || '';
        this.extra = options.extra || null;
    };



    public setModifiers(newMods: AttackModifierManager): Attack {
        this.modifiers = newMods;
        return this;
    };

    public setMeta(newMeta: AttackMeta): Attack {
        this.meta = newMeta;
        return this;
    };

    public setName(newName: string): Attack {
        this.name = newName;
        return this;
    };



    static get presets(): AttackPresets {
        return {
            shortSword: {
                stab: new Attack('Stab', new DamageHandler(8), {
                    meta: {
                        author: "WubzyGD",
                        description: "A simple stab attack; lunge at the enemy and pierce them directly with your sword.",
                        rarity: "Common"
                    }, id: "shortSword-stab"/*, extra: {attackType: blah}*/
                })
            }
        }
    };

}

interface AttackMeta {
    author?: string,
    description?: string,
    useText?: string,
    rarity?: string | number
    custom?: object
}

interface AttackOptions {
    meta?: AttackMeta,
    modifiers?: AttackModifierManager,
    id?: string,
    extra?: AttackExtra
}

interface AttackExtra {
    attackType?: AttackType //TODO add AttackType class
}

interface AttackPresets {
    shortSword: {
        stab: Attack}/*,
        slice: Attack,
        combo: Attack
    },
    longSword: {
        stab: Attack,
        slice: Attack,
        combo: Attack
    }*/
}


let example = Attack.presets.shortSword.stab;