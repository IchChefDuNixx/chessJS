import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from './Pieces';

class Board {
    private board: (Piece | null)[][];

    constructor() {
        this.board = this.createInitialBoard();
    }

    private createInitialBoard(): (Piece | null)[][] {
        return [
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
    }

    public getBoard(): (Piece | null)[][] {
        return this.board;
    }

    public setBoard(newBoard: (Piece | null)[][]): void {
        this.board = newBoard;
    }

    public resetBoard(): void {
        this.board = this.createInitialBoard();
    }

    //Not super sure about this!
    public setPieceOnBoard(startX: number, startY: number, endX: number, endY: number): void {
      const piece = this.board[startX][startY];
      if (piece) {
          // Remove the piece from its original position
          this.board[startX][startY] = null;
          // Update the piece's position
          piece.X = endX;
          piece.Y = endY;
          // Place the piece in the new position
          this.board[endX][endY] = piece;
      }
  }
}


export { Board };
