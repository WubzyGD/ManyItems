import {Item} from '../item';
import {Attack} from "../attack/attack";
import {AttackManager} from "../manager/attack/attackmanager";

export class Weapon extends Item {

    attacks: AttackManager;
    mainAttack: Attack;



    constructor(name: string, mainAttack: Attack, attacks: Array<Attack>, type?: string) {
        super(name, type);
        this.name = name;
        this.mainAttack = mainAttack;
        this.attacks = new AttackManager(function (a, s) {let t: Attack[] = [a]; s.forEach(v => t.push(v)); return t;}(mainAttack, attacks));
    };



    public addAttacks(attacks: Array<Attack>): Weapon {
        if (Array.isArray(attacks)) {attacks.forEach(attack => this.attacks.addAttack(attack));}
        else {this.attacks.addAttack(attacks);}
        return this;
    }

    public clearAttacks(attacks) {
        this.attacks.clear();
    };

    public attack(attack: Attack | string) {
        if (attack) {}
        else {

        }
    }; //TODO Weapon attacking

}