import { PieceProps, BoardIndex } from "./Piece";
import Piece from "./Piece";

class Knight extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'knight', hasMoved: false });
    }

    public getPossibleMoves(): {[key: string]: BoardIndex[][]} {
        const moveSet: {[key: string]: BoardIndex[][]} = {
            "up-left": [],
            "up-right": [],
            "right-up": [],
            "right-down": [],
            "down-right": [],
            "down-left": [],
            "left-down": [],
            "left-up": []
        };
        if (Piece.isInBounds(this.X+2, this.Y-1)) {moveSet["up-left"].push([this.X+2 as BoardIndex, this.Y-1 as BoardIndex])};
        if (Piece.isInBounds(this.X+2, this.Y+1)) {moveSet["up-right"].push([this.X+2 as BoardIndex, this.Y+1 as BoardIndex])};
        if (Piece.isInBounds(this.X+1, this.Y+2)) {moveSet["right-up"].push([this.X+1 as BoardIndex, this.Y+2 as BoardIndex])};
        if (Piece.isInBounds(this.X-1, this.Y+2)) {moveSet["right-down"].push([this.X-1 as BoardIndex, this.Y+2 as BoardIndex])};
        if (Piece.isInBounds(this.X-2, this.Y+1)) {moveSet["down-right"].push([this.X-2 as BoardIndex, this.Y+1 as BoardIndex])};
        if (Piece.isInBounds(this.X-2, this.Y-1)) {moveSet["down-left"].push([this.X-2 as BoardIndex, this.Y-1 as BoardIndex])};
        if (Piece.isInBounds(this.X-1, this.Y-2)) {moveSet["left-down"].push([this.X-1 as BoardIndex, this.Y-2 as BoardIndex])};
        if (Piece.isInBounds(this.X+1, this.Y-2)) {moveSet["left-up"].push([this.X+1 as BoardIndex, this.Y-2 as BoardIndex])};
        return moveSet;
    }
}

export default Knight;
