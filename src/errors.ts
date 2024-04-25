export const ErrorBuilder = (name) => class CustomError extends Error {
    name: string = name;
    constructor(message?: string) {
        super(message);
    }
}

export {XPAssignmentError, LevelAssignmentError} from './features/xp';