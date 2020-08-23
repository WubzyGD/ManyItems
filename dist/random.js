"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
class Random {
    constructor(calcType, simple, bubble, complex) {
        this.calcType = calcType;
        if ((simple === null || simple === undefined) && (bubble === null || bubble === undefined) && (complex === null || complex === undefined)) {
            throw new SyntaxError("Error in Random class constructor: You must pass values for one or multiple of the following: 'simple', 'complex', or 'bubble'");
        }
        this.bubble = bubble;
        this.complex = complex;
        this.simple = simple;
    }
    ;
    static from(random) {
        let calcType;
        let simple;
        let bubble;
        let complex;
        function checkRandomBubble(obj) { return 'min' in obj; }
        function checkRandomComplex(obj) { return 'force' in obj; }
        if (typeof random == "number") {
            calcType = "int";
            simple = random;
        }
        else if (checkRandomBubble(random)) {
            calcType = "bubble";
            simple = null;
            complex = null;
            bubble = random;
        }
        else if (checkRandomComplex(random)) {
            calcType = "complex";
            simple = null;
            bubble = random.random;
            complex = random;
        }
        else {
            throw new SyntaxError("Error when trying to create Random class from obj: Invalid object provided. Make sure it matches the type 'Random_Obj'.");
        }
        return new Random(calcType, simple, bubble, complex);
    }
    ;
}
exports.Random = Random;
