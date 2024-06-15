import { useEffect, useState } from "react";
import Square from "./Square";
import Piece from "./Piece";
import "./Board.css";
import axios from "axios";
import useWebSocket from 'react-use-websocket';

const initialBoard: string[] = [
  "rook_b", "knight_b", "bishop_b", "queen_b", "king_b", "bishop_b", "knight_b", "rook_b",
  "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w",
  "rook_w", "knight_w", "bishop_w", "queen_w", "king_w", "bishop_w", "knight_w", "rook_w"
];

function Board() {
    const [reversed, setReversed] = useState(false);
    
    const [username, setUsername] = useState(null);
    useEffect(() => {
        const config = {headers: {"Authorization": `Bearer ${sessionStorage.accessToken}`}}; // auth
        axios.get("/api/user/profile", config)
            .then(response => setUsername(response.data.username))
            .catch()
    }, []);
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(`ws://localhost:8173?username=${username}`, {
        onOpen: () => console.log('WebSocket connection established.'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
    });
    // const [board, setBoard] = useState(initialBoard);
    let board: string[] = lastJsonMessage?.board || initialBoard;

    const handleMove = (start: number, end: number): void => {
        // the move has to be checked by our chess model
        const execute_move = (): void => {
            const newBoard = [...board];
            const movedPiece = newBoard[start];
            newBoard[start] = "";
            newBoard[end] = movedPiece;
            // setBoard(newBoard);
            sendJsonMessage({board: newBoard});
        };

        axios.post("/api/validate_move", {start, end}) // add params for checking in this object
            .then((response) => {
                let is_valid_move: boolean = response.data;
                if (is_valid_move) execute_move();
            })
            .catch((error) => {
                console.log("Something went wrong");
            });
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
                <button onClick={() => sendJsonMessage({board: initialBoard})}> Restart Game </button>
            </div>
        </>
    );
}

export default Board;
