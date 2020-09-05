import {Random} from "./random";

export enum RarityValkyrie {
    R1 = "Scrap",
    R2 = "Common",
    R3 = "Uncommon",
    R4 = "Rare",
    R5 = "Legendary",
    R6 = "Exotic",
    R7 = "Exalted"
}

export const dice = {
    d4: new Random("bubble", null, {min: 1, max: 4}, null),
    d6: new Random("bubble", null, {min: 1, max: 6}, null),
    d8: new Random("bubble", null, {min: 1, max: 8}, null),
    d10: new Random("bubble", null, {min: 1, max: 10}, null),
    d12: new Random("bubble", null, {min: 1, max: 12}, null),
    d20: new Random("bubble", null, {min: 1, max: 20}, null),
    d100: new Random("bubble", null, {min: 1, max: 100}, null)
}