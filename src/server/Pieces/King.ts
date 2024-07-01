import { PieceProps, BoardIndex } from "./Piece";
import Piece from "./Piece";

class King extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'king', hasMoved: false});
    }

    public getPossibleMoves(): {[key: string]: BoardIndex[][]} {
        // const kingMoves = [
        //     [1, 0], [-1, 0], [0, 1], [0, -1],
        //     [1, 1], [-1, -1], [1, -1], [-1, 1]
        // ];
        return {...Piece.getOrthogonalMoves(this.X, this.Y, 1), ...Piece.getDiagonalMoves(this.X, this.Y, 1)};
    }
}

export default King;
