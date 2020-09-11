import { Weapon } from "./weapon";

export class Character {
    name: string;
    bio: Bio;
    stats: Stats;
    meta: Meta;
    inventory: Inventory;
    protected cflow: Flow;
    onDeath: OnDeath;

    level: number;
    xp: number;
    protected increaseFormula: IncreaseFormula = {str: '', max: function(s) {}};



    constructor (name: string, bio: Bio, stats: Stats, inventory?: Inventory | null, meta?: Meta) {
        this.name = name;
        this.stats = stats;
        this.meta = meta;

        if (!inventory) {inventory = {armor: null, items: null, mainHand: null};}
        this.inventory = inventory;

        if (!bio.level) {bio.level = 0;}
        if (!bio.xp) {bio.xp = 0;}
        this.bio = bio;
    };



    public takeDamage(damage: number, nokill?: boolean): Character {
        if (typeof damage != "number" && typeof damage != "string") {throw new TypeError("Error in Character#takeDamage: Param 'damage' must be of type 'number' or 'string'.");}
        if (typeof damage == "string") {
            if (isNaN(damage)) {throw new TypeError("Error in Character#takeDamage: Param 'damage' is string but cannot be converted to number.")} 
            else {damage = Number(damage);}
        }

        if (this.stats.hp.latticeHP && this.stats.hp.latticeHP > 0) {
            let t = this.stats.hp.latticeHP;
            this.stats.hp.latticeHP -= damage;
            damage -= t;
            this.stats.hp.latticeHP = this.stats.hp.latticeHP < 0 ? 0 : this.stats.hp.latticeHP;
            damage = damage < 0 ? 0 : damage;
        }

        if (typeof this.stats.hp.currentHP == "undefined" || this.stats.hp.currentHP === null) {this.stats.hp.currentHP = this.stats.hp.maxHP;}

        this.stats.hp.currentHP -= damage;

        if (this.stats.hp.currentHP <= 0 && !nokill) {this.kill();}


        return this;
    };

    //public heal() {};

    //public levelUp() {};

    //public getXp() {};

    //public useWeapon(w: Weapon) {};

    //public useItem(i) {};

    public kill(message?: string) {

    };

    //public revive() {};

    //public flow() {};

    //public setFormula() {};

    //public setKillHP(hp: number) {};



    //public static inventory() {};

    

    get lvlstr(): string {
        return `Level ${this.level} - `;
    };

    get formula(): IncreaseFormula {
        return this.increaseFormula;
    }

    set formula(f: IncreaseFormula) {
        this.formula = f;
    }

    get killHP() {
        if (typeof this.stats.hp.killHP == "number") {return this.stats.hp.killHP;}
        else {
            let khp = this.stats.hp.killHP;
            if (khp == "-max" || typeof khp == "undefined") {return this.stats.hp.maxHP * (0-1);}
            else if (khp == "-1/2max") {return (this.stats.hp.maxHP / 2) * (0-1);}
            else if (khp == "-2/3max") {return ((this.stats.hp.maxHP / 3) * 2) * (0-1);}
            else {throw new TypeError("Error in getter Character#killHP: Character#stats.hp.killHP was not set to a valid value.");}
        }
    };

    set killHP(hp: number | "-max" | "-1/2max" | '-2/3max') {
        this.stats.hp.killHP = hp;
    };

}

type Alignment = "Lawful Good" | "Lawful Neutral" | "Lawful Evil" | "Neutral Good" | "True Neutral" | "Neutral Evil" | "Chaotic Good" | "Chaotic Neutral" | "Chaotic Evil";

interface Personality {
    general: string,
    hobbies?: string | String[],
    skills?: string | String[],
    flaws?: string | String[],
    virtues?: string | String[],
    past?: string | String[],
    connections?: string | String[]
}

interface HP {
    maxHP: number,
    currentHP?: number,
    latticeHP?: number,
    killHP?: number | "-max" | "-1/2max" | '-2/3max'
}

interface Bio {
    species: string,
    age: number | "Unknown" | "Secret",
    level?: number,
    xp?: number,
    class?: string,
    gender?: string,
    personality?: Personality
}

interface Stats {
    hp: HP
    alignment: Alignment,
    maxWeight?: number
}

interface Meta {
    author?: string,
    isOC?: boolean,
    appearsIn?: string | String[]
}

interface Inventory {
    armor: {
        helmet?: string,
        chestplate?: string,
        wristguards?: string,
        gloves?: string,
        cloak?: string,
        greaves?: string,
        boots?: string,
        warding?: string
    } | null,
    space?: number,
    mainHand: string | object | null,
    offHand?: string | object | null,
    otherHands?: [string | object | null][],
    items: Array<string> | Array<object> | object | null
}

interface IncreaseFormula {
    str: string,
    max: Function
}

interface Flow {}

interface OnDeath {
    killHP?: number | "-max" | "-1/2max" | '-2/3max',
    deathMessage?: string,
    withInventory?: "drop-all" | "drop-rand" | "drop-rand-no-money" | "drop-rand-money" | "drop-money" | "drop-none"
}