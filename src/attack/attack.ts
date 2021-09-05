import {Damage} from "./damage";
import {Player} from "../char/player";

export class Attack {

    name: string;
    damage: Damage


    constructor(name: string, damage: number | Damage) {
        this.name = name;
        this.damage = typeof damage === 'number' ? new Damage(damage) : damage;
    }



    public attack(target: Player, damage?: number | Damage): Attack {
        damage = damage || this.damage;
        if (typeof damage === 'number') {damage = new Damage(damage);}
        target.takeDamage(damage.baseDamage);
        return this;
    }

}