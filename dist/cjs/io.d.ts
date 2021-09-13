export declare class LineReader {
    path: string;
    private readonly readInterface;
    private iter;
    constructor(path: string);
    read(): Promise<string | null>;
    close(): void;
}
