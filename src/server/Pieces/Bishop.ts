import { PieceProps, BoardIndex } from "./Piece";
import Piece from "./Piece";

class Bishop extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'bishop', hasMoved: false });
    }

    public getPossibleMoves(): {[key: string]: BoardIndex[][]} {
        return Piece.getDiagonalMoves(this.X, this.Y);
    }
}

export default Bishop;
