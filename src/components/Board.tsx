import { useState } from "react";
import Square from "./Square";
import Piece from "./Piece";
import "./Board.css";

const initialBoard = [
  "rook_b", "knight_b", "bishop_b", "king_b", "queen_b", "bishop_b", "knight_b", "rook_b",
  "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w",
  "rook_w", "knight_w", "bishop_w", "king_w", "queen_w", "bishop_w", "knight_w", "rook_w"
];

// Not sure if this belongs here but we might need it for proper movement logic
const alphanumericBoard = [
'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8', 
'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', 
'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6', 
'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5', 
'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 
'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3', 
'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', 
'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
];

function Board() {
    const [board, setBoard] = useState(initialBoard);
    const [reversed, setReversed] = useState(false);

    const handleMove = (start: number, end: number) => {
        // the move has to be checked by our chess model
        const newBoard = [...board];
        const movedPiece = newBoard[start];
        newBoard[start] = "";
        newBoard[end] = movedPiece;
        setBoard(newBoard);
    };

    const renderSquare = (piece: string, position: number) => {
        // determine square color
        const row = Math.floor(position / 8);
        let black: boolean;

        if (row % 2 === 0)
            black = (position % 2 === 0) ? true : false;
        else
            black = (position % 2 === 0) ? false : true;

        // empty square
        if (piece === "")
            return(<Square black={black} position={position} key={position} handleMove={handleMove} />);

        // square with piece
        return(
            <Square black={black} position={position} key={position} handleMove={handleMove} >
                <Piece type={piece} />
            </Square>
        );
    };

    const renderedBoard = board.map((piece, position) => renderSquare(piece, position));

    return(
        <>
            <div className="board" >
                { reversed ? renderedBoard.reverse() : renderedBoard }
            </div>
            <div>
                <button onClick={() => setReversed(!reversed)} > Reverse Board </button>
            </div>
        </>
    );
}

export default Board;
