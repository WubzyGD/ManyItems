export class ConstructorError extends Error {
    constructor(message: string, name?: string) {
        super(message);
        this.name = name || "ConstructorError";
    }
}

export class ValueError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValueError";
    }
}

export class DurabilityStateError extends Error {
    constructor(message?: string) {
        super(message);
    }
}