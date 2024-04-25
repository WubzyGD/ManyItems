import * as ifeatures from './features/exports';
export declare const features: {
    Feature: typeof ifeatures.Feature;
    XP: typeof ifeatures.XP;
};
export declare const errors: {
    ErrorBuilder: (name: any) => {
        new (message?: string): {
            name: string;
            message: string;
            stack?: string;
        };
    };
    XPAssignmentError: {
        new (message?: string): {
            name: string;
            message: string;
            stack?: string;
        };
    };
    LevelAssignmentError: {
        new (message?: string): {
            name: string;
            message: string;
            stack?: string;
        };
    };
};
export * from './basicitem';
