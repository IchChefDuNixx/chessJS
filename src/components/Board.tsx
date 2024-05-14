import { useState } from "react";
import Square from "./Square";
import Piece from "./Piece";
import "./Board.css";


interface Props {
    initialBoard: string[]
}


function Board({ initialBoard } : Props) {
    const [board, setBoard] = useState(initialBoard);

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

    return(
        <div className="board" >
            { board.map((piece, position) => renderSquare(piece, position)) }
        </div>
    );
}


export default Board;