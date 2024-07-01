import Bishop from "./Pieces/Bishop";
import King from "./Pieces/King";
import Knight from "./Pieces/Knight";
import Pawn from "./Pieces/Pawn";
import type { BoardIndex, PieceColor } from "./Pieces/Piece";
import Piece from "./Pieces/Piece";
import Queen from "./Pieces/Queen";
import Rook from "./Pieces/Rook";


class Board {
    private board: (Piece | null)[][];
    private turn: PieceColor;

    constructor() {
        this.board = this.createInitialBoard();
        this.turn = 'w'
    }

    private createInitialBoard(): (Piece | null)[][] {
        return [
            [
                new Rook    ({ X: 0, Y: 0, color: "b" }),
                new Knight  ({ X: 0, Y: 1, color: "b" }),
                new Bishop  ({ X: 0, Y: 2, color: "b" }),
                new Queen   ({ X: 0, Y: 3, color: "b" }),
                new King    ({ X: 0, Y: 4, color: "b" }),
                new Bishop  ({ X: 0, Y: 5, color: "b" }),
                new Knight  ({ X: 0, Y: 6, color: "b" }),
                new Rook    ({ X: 0, Y: 7, color: "b" }),
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
                new Rook    ({ X: 7, Y: 0, color: "w" }),
                new Knight  ({ X: 7, Y: 1, color: "w" }),
                new Bishop  ({ X: 7, Y: 2, color: "w" }),
                new Queen   ({ X: 7, Y: 3, color: "w" }),
                new King    ({ X: 7, Y: 4, color: "w" }),
                new Bishop  ({ X: 7, Y: 5, color: "w" }),
                new Knight  ({ X: 7, Y: 6, color: "w" }),
                new Rook    ({ X: 7, Y: 7, color: "w" }),
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
        this.turn = "w";
    }

    private changeTurn(): void {
        this.turn = this.turn == 'w' ? 'b' : 'w';
    }

    public getTurn(): PieceColor {
        return this.turn;
    }

    // Calculating the squares a given piece could move
    public getTrace(x: BoardIndex, y: BoardIndex): BoardIndex[][] {
        if (this.board[x][y] === null) {
            return [];
        }
        const piece = this.board[x][y];
        const returnArray: BoardIndex[][] = [];

        if (piece.getType() === "pawn") {
            if (piece.getColor() === 'w') {
                if (this.board[piece.X - 1][piece.Y + 1]?.getColor() === 'b') {
                    returnArray.push([piece.X - 1 as BoardIndex, piece.Y + 1 as BoardIndex]);
                }
                if (this.board[piece.X - 1][piece.Y - 1]?.getColor() === 'b') {
                    returnArray.push([piece.X - 1 as BoardIndex, piece.Y - 1 as BoardIndex]);
                }
            } else if (piece.getColor() === 'b') {
                if (this.board[piece.X + 1][piece.Y + 1]?.getColor() === 'w') {
                    returnArray.push([piece.X + 1 as BoardIndex, piece.Y + 1 as BoardIndex]);
                }
                if (this.board[piece.X + 1][piece.Y - 1]?.getColor() === 'w') {
                    returnArray.push([piece.X + 1 as BoardIndex, piece.Y - 1 as BoardIndex]);
                }
            }
        };
        // for all pieces including Pawn
        const moveSet = piece.getPossibleMoves();
        if (Object.keys(moveSet).length >= 0) {
            for (const [_, moves] of Object.entries(moveSet)) {
                for (const [moveX, moveY] of moves as [BoardIndex, BoardIndex][]) {
                    // Empty Square -> allowed Move
                    if (this.board[moveX][moveY] == null) {
                        returnArray.push([moveX, moveY]);
                    } else {
                        // Different Color -> allowed take
                        if (this.board[moveX][moveY].getColor() !== piece.getColor()) {
                            returnArray.push([moveX, moveY]);
                        }
                        break;
                    }
                }
            }
        };

        return returnArray;
    }

    public isValidMove(x: number, y: number, endX: number, endY: number, playerColor: PieceColor | null): boolean {
        if (!Piece.isInBounds(x, y)) { return false };

        const allowedMoveset: number[][] = this.getTrace(x as BoardIndex, y as BoardIndex);
        const piece = this.board[x][y]

        if (this.turn == piece?.color && this.turn == playerColor) {
            for (const [moveX, moveY] of allowedMoveset) {
                if (endX === moveX && endY === moveY) {
                    this.changeTurn();
                    return true;
                }
            }
        }
        return false;
    }

    protected getKingPosition(color: 'b'|'w'): number[][] {
        const returnArray: number[][] = [];
        for (let x = 0; x <= 7; x++){
            for (let y = 0; y <= 7; y++){
                if(this.board[x][y]?.getType() === 'king' && this.board[x][y]?.getColor() === color){
                    return [[x,y]];
                }
            }
        }
        return returnArray
    }

    // public isCheckWhite(): boolean {
    //     const whiteKingPosition = this.getKingPosition('w');

    //     // Add your check logic here for white king
    //     return false;
    // }

    // public isCheckBlack(): boolean {
    //     const blackKingPosition = this.getKingPosition('b');

    //     // Add your check logic here for black king
    //     return false;
    // }

    // TODO: find and set true/false kingTaken in class
    // res.status(200).send({ isValid: true, gameOver: currGame.getIsKingTaken()});
    public movePiece(startX: BoardIndex, startY: BoardIndex, endX: BoardIndex, endY: BoardIndex): void {
        const piece = this.board[startX][startY];
        if (piece) {
            // Remove the piece from its original position
            this.board[startX][startY] = null;
            // Update the piece's position
            piece.X = endX;
            piece.Y = endY;
            // Place the piece in the new position
            this.board[endX][endY] = piece;
            piece.setHasMoved();
        }
    }
}

export default Board;
