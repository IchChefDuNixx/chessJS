type BoardIndex = 0|1|2|3|4|5|6|7;
type PieceColor = 'w' | 'b';
type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'king' | 'queen';

interface PieceProps {
    X: BoardIndex;
    Y: BoardIndex;
    type: PieceType;
    color: PieceColor;
    hasMoved: boolean;
}

abstract class Piece {
    X: BoardIndex;
    Y: BoardIndex;
    type: PieceType;
    color: PieceColor;
    hasMoved: boolean;

    constructor(props: PieceProps) {
        this.type = props.type;
        this.color = props.color;
        this.X = props.X;
        this.Y = props.Y;
        this.hasMoved = false;
    }

    public getType(): PieceType {
        return this.type;
    }

    public getColor(): PieceColor {
        return this.color;
    }

    // see whether list or dict would be better later on
    public getPosition(): [BoardIndex, BoardIndex] {
        return [this.X, this.Y];
    }

    protected setPosition(newX: BoardIndex, newY: BoardIndex): void {
        this.X = newX;
        this.Y = newY;
    }

    public setHasMoved(): void {
        this.hasMoved = true;
    }

    public static isInBounds(x: number, y: number): boolean {
        return (x >= 0 && x <= 7 && y >= 0 && y <= 7);
    }

    // Horizontal + Vertical
    public static getOrthogonalMoves(x: BoardIndex, y: BoardIndex, steps: number = 8): {[key: string]: BoardIndex[][]} {
        const moveSet: {[key: string]: BoardIndex[][]} = {
            "up": [],
            "down": [],
            "left": [],
            "right": []
        };
        const maxSteps = Math.min(Math.max(Math.floor(steps), 0), 8); // maxSteps in [0, 8]
        for (let i = 1; i < maxSteps; i++) {
            if (Piece.isInBounds(x + i, y)) {moveSet["right"].push([x + i as BoardIndex, y])};
            if (Piece.isInBounds(x - i, y)) {moveSet["left"].push([x - i as BoardIndex, y])};
            if (Piece.isInBounds(x, y + i)) {moveSet["up"].push([x, y + i as BoardIndex])};
            if (Piece.isInBounds(x, y - i)) {moveSet["down"].push([x, y - i as BoardIndex])};
        }
        return moveSet;
    }

    public static getDiagonalMoves(x: BoardIndex, y: BoardIndex, steps: number = 8): {[key: string]: BoardIndex[][]} {
        const moveSet: {[key: string]: BoardIndex[][]} = {
            "up-left": [],
            "up-right": [],
            "down-left": [],
            "down-right": []
        };
        const maxSteps = Math.min(Math.max(Math.floor(steps), 0), 8); // maxSteps in [0, 8]
        for (let i = 1; i < maxSteps; i++) {
            if (Piece.isInBounds(x + i, y + i)) {moveSet["up-right"].push([x + i as BoardIndex, y + i as BoardIndex])};
            if (Piece.isInBounds(x - i, y + i)) {moveSet["up-left"].push([x - i as BoardIndex, y + i as BoardIndex])};
            if (Piece.isInBounds(x + i, y - i)) {moveSet["down-right"].push([x + i as BoardIndex, y - i as BoardIndex])};
            if (Piece.isInBounds(x - i, y - i)) {moveSet["down-left"].push([x - i as BoardIndex, y - i as BoardIndex])};
        }
        return moveSet
    }

    abstract getPossibleMoves(): {[key: string]: BoardIndex[][]};
}

export default Piece;
export type { BoardIndex, PieceColor, PieceProps, PieceType };
