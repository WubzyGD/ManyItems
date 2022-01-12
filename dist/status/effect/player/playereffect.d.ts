import { HealthEffect } from "./healtheffect";
import { Effect } from '../effect';
import { Player } from "../../../char/player";
/**
 * An Effect applied to a Player instance.
 * This can be inflicted by a weapon or spell, given manually, or applied on a basis of race.
 */
export declare class PlayerEffect extends Effect {
    ignoreRaces: string[];
    health: {
        effect: HealthEffect;
        enabled: boolean;
    };
    meta: PlayerEffectMeta;
    /**
     * An Effect applied to a Player instance.
     * This can be inflicted by a weapon or spell, given manually, or applied on a basis of race
     * @param {string} id - The effect's id.
     * @param {string} displayName - A human-readable name for the effect.
     * @param {string[]} ignoreRaces - (Optional) - A list of races the effect can't be applied to.
     */
    constructor(id: string, displayName?: string, ignoreRaces?: string[]);
    setHealth(healthEffect: HealthEffect): PlayerEffect;
    setMeta(meta: PlayerEffectMeta): PlayerEffect;
    applyTo(target: Player): PlayerEffect;
}
export interface PlayerEffectMeta {
    text?: string;
}
