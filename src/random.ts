export class Random {
    bubble: RandomBubble | null;
    complex: RandomComplex | null;
    simple: number | null;

    calcType: "int" | "bubble" | "complex";



    constructor (calcType: "int" | "bubble" | "complex", simple?: number | null, bubble?: RandomBubble | null, complex?: RandomComplex | null) {
        this.calcType = calcType;

        if ((simple === null || simple === undefined) && (bubble === null || bubble === undefined) && (complex === null || complex === undefined)) {
            throw new SyntaxError("Error in Random class constructor: You must pass values for one or multiple of the following: 'simple', 'complex', or 'bubble'");
        }
        this.bubble = bubble;
        this.complex = complex;
        this.simple = simple;
    };



    public static from(random: Random_Obj): Random {
        let calcType;

        let simple;
        let bubble;
        let complex;

        function checkRandomBubble(obj: object): obj is RandomBubble {return 'min' in obj;}
        function checkRandomComplex(obj: object): obj is RandomComplex {return 'force' in obj;}

        if (typeof random == "number") {
            calcType = "int";
            simple = random;
        } else if (checkRandomBubble(random)) {
            calcType = "bubble";
            simple = null; complex = null;
            bubble = random;
        } else if (checkRandomComplex(random)) {
            calcType = "complex";
            simple = null;
            bubble = random.random;
            complex = random;
        } else {
            throw new SyntaxError("Error when trying to create Random class from obj: Invalid object provided. Make sure it matches the type 'Random_Obj'.");
        }

        return new Random(calcType, simple, bubble, complex);
    };

}

interface RandomBubble {
    min: number,
    max: number
}

interface RandomComplex {
    force: number,
    random: RandomBubble,
}

type Random_Obj = number | RandomBubble | RandomComplex;
