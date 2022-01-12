import {HealthEffect} from "./healtheffect";
import {Effect} from '../effect';
import {Player} from "../../../char/player";

/**
 * An Effect applied to a Player instance.
 * This can be inflicted by a weapon or spell, given manually, or applied on a basis of race.
 */
export class PlayerEffect extends Effect {

    ignoreRaces: string[];
    health: {effect: HealthEffect, enabled: boolean} = {effect: new HealthEffect(), enabled: true};
    meta: PlayerEffectMeta;


    /**
     * An Effect applied to a Player instance.
     * This can be inflicted by a weapon or spell, given manually, or applied on a basis of race
     * @param {string} id - The effect's id.
     * @param {string} displayName - A human-readable name for the effect.
     * @param {string[]} ignoreRaces - (Optional) - A list of races the effect can't be applied to.
     */
    constructor(id: string, displayName?: string, ignoreRaces?: string[]) {
        super(id, displayName);
        this.ignoreRaces = ignoreRaces || [];
    }



    public setHealth(healthEffect: HealthEffect): PlayerEffect {
        this.health.effect = healthEffect;
        return this;
    }

    public setMeta(meta: PlayerEffectMeta): PlayerEffect {
        this.meta = meta;
        return this;
    }

    public applyTo(target: Player): PlayerEffect {
        target.addEffect(this);
        return this;
    }

}

export interface PlayerEffectMeta {
    text?: string
}