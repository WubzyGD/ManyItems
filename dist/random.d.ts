export declare class Random {
    bubble: RandomBubble | null;
    complex: RandomComplex | null;
    simple: number | null;
    calcType: "int" | "bubble" | "complex";
    constructor(calcType: "int" | "bubble" | "complex", simple?: number | null, bubble?: RandomBubble | null, complex?: RandomComplex | null);
    static from(random: Random_Obj): Random;
}
interface RandomBubble {
    min: number;
    max: number;
}
interface RandomComplex {
    force: number;
    random: RandomBubble;
}
declare type Random_Obj = number | RandomBubble | RandomComplex;
export {};
