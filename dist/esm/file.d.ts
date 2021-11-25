/**
 * async sleep
 * @deprecated
 * @param {number} timeout
 * @return {Promise<void>}
 */
export declare const sleep: (timeout: number) => Promise<void>;
/**
 * download file which is Uint8Array
 * @param {Uint8Array[]} data
 * @param {string} filename
 * @param {string} type
 */
export declare const download: (data: Uint8Array[], filename: string, type: string) => void;
