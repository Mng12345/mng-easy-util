// merge multiply [[x1, y1], [x2, y2], ...] line into [x, y1, y2, y3, ...]
import lodash from 'lodash';

type MergeReturn = [string[]|number[], number[][]];
type SingleMergeStringInput = [string[], number[]];
type SingleMergeNumberInput = [number[], number[]];

function isSingleMergeStringInput(lines: any): lines is SingleMergeStringInput[] {
    let flag = true;
    for (const line of lines) {
        if(!(line.length && line.length === 2 && line[0].length && line[0].length >= 1 && typeof line[0][0] === 'string')) {
            flag = false;
            break;
        }
    }
    return flag;
}

function isSingleMergeNumberInput(lines: any): lines is SingleMergeNumberInput[] {
    let flag = true;
    for (const line of lines) {
        if(!(line.length && line.length === 2 && line[0].length && line[0].length >= 1 && typeof line[0][0] === 'number')) {
            flag = false;
            break;
        }
    }
    return flag;
}

export function merge(...lines: SingleMergeStringInput[] | SingleMergeNumberInput[]): MergeReturn {
    if (isSingleMergeNumberInput(lines)) {
        const xLines = lodash.flatten(lodash.map(lines, line => line[0]))
        const yLines = lines.map(line => line[1]);
        const xItemSet = lodash.set()
    }

    return undefined as any;
}
