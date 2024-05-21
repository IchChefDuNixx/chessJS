import { useState } from "react";
import Square from "./Square";
import Piece from "./Piece";
import "./Board.css";


interface Props {
    initialBoard: string[]
}


function Board({ initialBoard } : Props) {
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
        let black : boolean;

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