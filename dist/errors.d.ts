export declare const ErrorBuilder: (name: any) => {
    new (message?: string): {
        name: string;
        message: string;
        stack?: string;
    };
};
export { XPAssignmentError, LevelAssignmentError } from './features/xp';
