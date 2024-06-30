import { BoardIndex } from "../Pieces";


// transform list index to matrix index [0-63 -> (0-7, 0-7)]
function listIndexToBoardIndex(listIndex: number): [BoardIndex, BoardIndex] {
    const [x, y] = [~~(listIndex / 8), (listIndex % 8)];

    if (x < 0 || x > 7 || y < 0 || y > 7) {
        throw new RangeError(`Valid range [0,63] (${listIndex})`);
    }

    return [x, y];
}

// transform matrix index to list index [(0-7, 0-7) -> 0-63]
function BoardIndexToListIndex([x, y]: [BoardIndex, BoardIndex]) {
    if (x < 0 || x > 7) {
        throw new RangeError(`Valid range [0,7] (${x})`);
    }

    if (y < 0 || y > 7) {
        throw new RangeError(`Valid range [0,7] (${y})`);
    }

    return 8 * x + y;
}


export { listIndexToBoardIndex, BoardIndexToListIndex };
