import {Attack} from "../../attack/attack";

export class AttackManager {

    attacks: Attack[];



    constructor(attacks: Attack[]) {
        if (!attacks.length) {throw new SyntaxError("Error in AttackManager constructor: Attacks must not be an empty list.");}

        let a: Attack; for (a of attacks) {if (!a.id) {throw new SyntaxError(`Error in AttackManager constructor: Your attack: '${a.name}', did not have an 'id' parameter, which is required for attacks in an AttackManager.`);}}
        this.attacks = attacks;
    }



    public addAttack(attack: Attack): AttackManager {
        if (!attack.id) {throw new SyntaxError(`Error in AttackManager#addAttack: Your attack did not have an 'id' parameter, which is required for attacks in an AttackManager.`);}
        this.attacks.push(attack);

        return this;
    }

}