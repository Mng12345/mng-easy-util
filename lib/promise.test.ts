import {sleep} from "./file";
import {withTimeout} from "./promise";

test('withTimeout', async () => {
    const makePromise = async (): Promise<number> => {
        await sleep(5000);
        return 1;
    }
    const promiseWithTimeout = withTimeout(makePromise(), 6000);
    try {
        const num = await promiseWithTimeout;
        console.log(`promise returned:`, num);
    } catch (e) {
        console.log(e);
    }
}, 10000);
