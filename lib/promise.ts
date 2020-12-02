// make promise with timeout

export const withTimeout = async <T>(promise: Promise<T>, timeout: number): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        (async () => {
            const timer = setTimeout(() => {
                clearTimeout(timer);
                reject(`error with timeout: ${timeout}`);
            }, timeout);
            const t = await promise;
            resolve(t);
        })().catch(err => reject(err));
    });
}
