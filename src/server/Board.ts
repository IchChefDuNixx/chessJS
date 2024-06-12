import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from './Pieces';

class Board {}

const createBoard = (): string[] => {return ["s"]};

const initialBoard: (Piece | null)[][] = [
  [
    new Rook({ X: 0, Y: 0, color: "b" }),
    new Knight({ X: 0, Y: 1, color: "b" }),
    new Bishop({ X: 0, Y: 2, color: "b" }),
    new Queen({ X: 0, Y: 3, color: "b" }),
    new King({ X: 0, Y: 4, color: "b" }),
    new Bishop({ X: 0, Y: 5, color: "b" }),
    new Knight({ X: 0, Y: 6, color: "b" }),
    new Rook({ X: 0, Y: 7, color: "b" }),
  ],
  [
    new Pawn({ X: 1, Y: 0, color: "b" }),
    new Pawn({ X: 1, Y: 1, color: "b" }),
    new Pawn({ X: 1, Y: 2, color: "b" }),
    new Pawn({ X: 1, Y: 3, color: "b" }),
    new Pawn({ X: 1, Y: 4, color: "b" }),
    new Pawn({ X: 1, Y: 5, color: "b" }),
    new Pawn({ X: 1, Y: 6, color: "b" }),
    new Pawn({ X: 1, Y: 7, color: "b" }),
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    new Pawn({ X: 6, Y: 0, color: "w" }),
    new Pawn({ X: 6, Y: 1, color: "w" }),
    new Pawn({ X: 6, Y: 2, color: "w" }),
    new Pawn({ X: 6, Y: 3, color: "w" }),
    new Pawn({ X: 6, Y: 4, color: "w" }),
    new Pawn({ X: 6, Y: 5, color: "w" }),
    new Pawn({ X: 6, Y: 6, color: "w" }),
    new Pawn({ X: 6, Y: 7, color: "w" }),
  ],
  [
    new Rook({ X: 7, Y: 0, color: "w" }),
    new Knight({ X: 7, Y: 1, color: "w" }),
    new Bishop({ X: 7, Y: 2, color: "w" }),
    new Queen({ X: 7, Y: 3, color: "w" }),
    new King({ X: 7, Y: 4, color: "w" }),
    new Bishop({ X: 7, Y: 5, color: "w" }),
    new Knight({ X: 7, Y: 6, color: "w" }),
    new Rook({ X: 7, Y: 7, color: "w" }),
  ],
];


export { Board };
