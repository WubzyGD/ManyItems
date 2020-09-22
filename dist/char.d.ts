export declare class Character {
    name: string;
    bio: Bio;
    stats: Stats;
    meta: Meta;
    inventory: Inventory;
    protected cflow: Flow;
    onDeath: OnDeath;
    protected isDead: boolean;
    level: number;
    xp: number;
    protected increaseFormula: Function;
    constructor(name: string, bio: Bio, stats: Stats, inventory?: Inventory | null, meta?: Meta);
    takeDamage(damage: number, nokill?: boolean): Character;
    heal(hp: number): Character;
    max(): number;
    kill(message?: string): void;
    get lvlstr(): string;
    get formula(): Function;
    set formula(formula: Function);
    get killHP(): number | "-max" | "-1/2max" | '-2/3max';
    set killHP(hp: number | "-max" | "-1/2max" | '-2/3max');
    get flow(): Flow;
    set flow(flow: Flow);
    get dead(): boolean;
}
declare type Alignment = "Lawful Good" | "Lawful Neutral" | "Lawful Evil" | "Neutral Good" | "True Neutral" | "Neutral Evil" | "Chaotic Good" | "Chaotic Neutral" | "Chaotic Evil";
interface Personality {
    general: string;
    hobbies?: string | String[];
    skills?: string | String[];
    flaws?: string | String[];
    virtues?: string | String[];
    past?: string | String[];
    connections?: string | String[];
}
interface HP {
    maxHP: number;
    currentHP?: number;
    latticeHP?: number;
    killHP?: number | "-max" | "-1/2max" | '-2/3max';
}
interface Bio {
    species: string;
    age: number | "Unknown" | "Secret";
    level?: number;
    xp?: number;
    classtype?: string;
    gender?: string;
    personality?: Personality;
}
interface Stats {
    hp: HP;
    alignment: Alignment;
    maxWeight?: number;
}
interface Meta {
    author?: string;
    isOC?: boolean;
    appearsIn?: string | String[];
}
interface Inventory {
    armor: {
        helmet?: string;
        chestplate?: string;
        wristguards?: string;
        gloves?: string;
        cloak?: string;
        greaves?: string;
        boots?: string;
        warding?: string;
    } | null;
    space?: number;
    mainHand: string | object | null;
    offHand?: string | object | null;
    otherHands?: [string | object | null][];
    items: Array<string> | Array<object> | object | null;
}
interface Flow {
}
interface OnDeath {
    killHP?: number | "-max" | "-1/2max" | '-2/3max';
    deathMessage?: string;
    withInventory?: "drop-all" | "drop-rand" | "drop-rand-no-money" | "drop-rand-money" | "drop-money" | "drop-none";
}
export {};
