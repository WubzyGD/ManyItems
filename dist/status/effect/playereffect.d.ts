import { HealthEffect } from "./healtheffect";
import { Player } from "../../char/player";
/**
 * An Effect applied to a Player instance.
 * This can be inflicted by a weapon or spell, given manually, or applied on a basis of race.
 */
export declare class PlayerEffect {
    name: string;
    ignoreRaces: string[];
    health: {
        effect: HealthEffect;
        enabled: boolean;
    };
    meta: PlayerEffectMeta;
    /**
     * An Effect applied to a Player instance.
     * This can be inflicted by a weapon or spell, given manually, or applied on a basis of race
     * @param {string} name - The effect's name.
     * @param {string[]} ignoreRaces - (Optional) - A list of races the effect can't be applied to.
     */
    constructor(name: string, ignoreRaces?: string[]);
    setHealth(healthEffect: HealthEffect): PlayerEffect;
    setMeta(meta: PlayerEffectMeta): PlayerEffect;
    applyTo(target: Player): PlayerEffect;
}
export interface PlayerEffectMeta {
    text?: string;
}
