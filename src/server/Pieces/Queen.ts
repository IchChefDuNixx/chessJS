import { PieceProps, BoardIndex } from "./Piece";
import Piece from "./Piece";

class Queen extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'queen', hasMoved: false });
    }

    public getPossibleMoves(): {[key: string]: BoardIndex[][]} {
        return {...Piece.getOrthogonalMoves(this.X, this.Y), ...Piece.getDiagonalMoves(this.X, this.Y)};
    }
}

export default Queen;
