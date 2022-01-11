export class HealthManagerError extends Error {
    constructor(message: string, name?: string) {
        super(message);
        this.name = name || "HealthManagerError";
    }
}

export class HealthManagerConstructorError extends HealthManagerError {
    constructor(message: string) {
        super(message);
        this.name = "HealthMangerConstructorError";
    }
}