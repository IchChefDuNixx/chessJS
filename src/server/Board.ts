import { Bishop, King, Knight, Pawn, Piece, type PieceType, Queen, Rook } from './Pieces';

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

    // what is a trace?
    // public getTrace(piece: Piece): Set<[number,number]> {
    public getTrace(x: number,y: number): Set<[number,number]> {
        const piece = this.board[x][y];
        const returnSet = new Set<[number,number]>();
        // Trace of pawn
        if (piece.getType() == 'pawn') {
            const moves = piece.getPossibleMoves(piece.X, piece.Y)
            for (const [x,y] of moves) {
                if (this.board[x][y] == null) {
                    returnSet.add([x,y]);
                } else { break }
            }
        // Trace for knight and king
        } else if (piece.getType() == 'knight' || piece.getType() == 'king') {
            const moves = piece.getPossibleMoves(piece.X, piece.Y);
            for (const [x,y] of moves) {
                if (this.board[x][y]) {
                    if ((this.board[x][y] as Piece).getColor() != piece.getColor()) {
                        returnSet.add([x,y]);
                        break;
                    }
                } else {
                    returnSet.add([x,y]);
                }
            }
        // Trace of Rook, Bishop, Queen
        } else {
            for (const [key, value] of piece.getPossibleMoves()) {
                for (const [x,y] of value) {
                    if (this.board[x][y]) {
                        if ((this.board[x][y] as Piece).getColor() != piece.getColor()) {
                            returnSet.add(value);
                            break;
                        } else {
                            break;
                        }
                    } else {
                        returnSet.add(value);
                    }
                }
            }

        }
        return returnSet;
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


export default Board;
