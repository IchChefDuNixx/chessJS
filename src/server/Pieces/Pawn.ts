import { PieceProps, BoardIndex } from "./Piece";
import Piece from "./Piece";

class Pawn extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'pawn', hasMoved: false });
    }

    public getPossibleMoves() {
        const moveSet: {[key: string]: BoardIndex[][]} = {
            "up-down": []
        };

        if (this.color == 'b' && Piece.isInBounds(this.X + 1, this.Y)) {
            moveSet["up-down"].push([this.X + 1 as BoardIndex, this.Y]);
            if (this.hasMoved == false && Piece.isInBounds(this.X + 2, this.Y)) {
                moveSet["up-down"].push([this.X + 2 as BoardIndex, this.Y]);
            }
        } else {
            if (Piece.isInBounds(this.X - 1, this.Y)) {
                moveSet["up-down"].push([this.X - 1 as BoardIndex, this.Y]);
                if (this.hasMoved == false  && Piece.isInBounds(this.X - 2, this.Y)) {
                    moveSet["up-down"].push([this.X - 2 as BoardIndex, this.Y]);
                }
            }
        }
        return moveSet;
    }
}

export default Pawn;
