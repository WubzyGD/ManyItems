export class Character {
    name: string;
    bio: Bio;
    stats: Stats;

    constructor (name: string, bio: Bio, stats: Stats) {};

}

type Alignment = "Lawful Good" | "Lawful Neutral" | "Lawful Evil" | "Neutral Good" | "True Neutral" | "Neutral Evil" | "Chaotic Good" | "Chaotic Neutral" | "Chaotic Evil";

interface Personality {}

interface HP {
    maxHP: number,
    currentHP?: number,
    latticeHP?: number,
}

interface Bio {
    species: string,
    age: number | "Unknown" | "Secret",
    class?: string,
    gender?: string,
    personality?: Personality
}

interface Stats {
    hp: HP
    alignment: Alignment
}

interface Meta {}