export declare class Character {
    name: string;
    bio: Bio;
    stats: Stats;
    meta: Meta;
    constructor(name: string, bio: Bio, stats: Stats, meta?: Meta);
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
}
interface Bio {
    species: string;
    age: number | "Unknown" | "Secret";
    class?: string;
    gender?: string;
    personality?: Personality;
}
interface Stats {
    hp: HP;
    alignment: Alignment;
}
interface Meta {
    author?: string;
    isOC?: boolean;
    appearsIn?: string | String[];
}
export {};
