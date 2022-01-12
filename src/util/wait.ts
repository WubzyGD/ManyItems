export function wait (time: number) {
    return new Promise((resolve: (value: null) => null) => {
        setTimeout(() => resolve(null), time);
    });
};