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
        if (complex !== null) {
            this.bubble = complex.random;
        }
    }
    ;
    static err_calcType(type) {
        throw new SyntaxError(`Error in calculating random value: This Random instance doesn't have a '${type}' calc registered.`);
    }
    ;
    calc_int() {
        if (this.simple === null) {
            Random.err_calcType("int");
        }
        return Math.floor(Math.random() * this.simple + 1);
    }
    ;
    calc_bubble() {
        if (this.bubble === null) {
            Random.err_calcType("bubble");
        }
        return Math.floor(Math.random() * (this.bubble.max - this.bubble.min + 1) + this.bubble.min);
    }
    ;
    calc_complex() {
        if (this.complex === null) {
            Random.err_calcType("complex");
        }
        return this.calc_bubble() + this.complex.force;
    }
    ;
    calc(type) {
        if (!type) {
            type = this.calcType;
        }
        if (type == "int") {
            return this.calc_int();
        }
        else if (type == "bubble") {
            return this.calc_bubble();
        }
        else if (type == "complex") {
            return this.calc_complex();
        }
        else {
            throw new SyntaxError("Error in calculating random value: Invalid calculation type provided. You may also call the function with no parameters to call your default calc method.");
        }
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
            bubble = null;
            complex = null;
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
    get rand() { return this.calc(); }
    ;
    get calc_simple() { return this.calc_int(); }
    ;
    get int() { return this.simple; }
    ;
}
exports.Random = Random;
