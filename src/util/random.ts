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

        if (complex !== null && complex !== undefined) {this.bubble = complex.random;}
    };



    private static err_calcType(type: "int" | "bubble" | "complex") {
        throw new SyntaxError(`Error in calculating random value: This Random instance doesn't have a '${type}' calc registered.`)
    };


    public calc_int(): number {
        if (this.simple === null) {Random.err_calcType("int");}
        return Math.floor(Math.random() * this.simple + 1);
    };

    public calc_bubble(): number {
        if (this.bubble === null) {Random.err_calcType("bubble");}
        return Math.floor(Math.random() * (this.bubble.max - this.bubble.min + 1) + this.bubble.min);
    };

    public calc_complex(): number {
        if (this.complex === null) {Random.err_calcType("complex");}
        return this.calc_bubble() + this.complex.force;
    };

    public calc(type?: "int" | "bubble" | "complex"): number {
        if (!type) {type = this.calcType;}
        if (type == "int") {return this.calc_int();}
        else if (type == "bubble") {return this.calc_bubble();}
        else if (type == "complex") {return this.calc_complex();}
        else {throw new SyntaxError("Error in calculating random value: Invalid calculation type provided. You may also call the function with no parameters to call your default calc method.");}
    };

    public roll(): number {return this.calc();};


    get rand(): number {return this.calc();};

    get calc_simple(): number {return this.calc_int();};

    get int(): number {return this.simple;};


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
            bubble = null; complex = null;
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

    public static calc_int(int: number): number {
        if (int === null) {Random.err_calcType("int");}
        return Math.floor(Math.random() * int + 1);
    };

    public static calc_bubble(bubble: RandomBubble): number {
        if (bubble === null) {Random.err_calcType("bubble");}
        return Math.floor(Math.random() * (bubble.max - bubble.min + 1) + bubble.min);
    };

    public static calc_complex(complexity: RandomComplex): number {
        if (complexity === null) {Random.err_calcType("complex");}
        return Random.calc_bubble(complexity.random) + complexity.force;
    };

    public static calc_simple(int: number): number {return Random.calc_int(int);};

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