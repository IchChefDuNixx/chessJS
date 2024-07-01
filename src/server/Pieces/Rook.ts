import { PieceProps, BoardIndex } from "./Piece";
import Piece from "./Piece";

class Rook extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'rook', hasMoved: false });
    }

    public getPossibleMoves(): {[key: string]: BoardIndex[][]} {
        return Piece.getOrthogonalMoves(this.X, this.Y);
    }
}

export default Rook;
