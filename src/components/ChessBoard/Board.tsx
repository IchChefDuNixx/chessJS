import axios from "axios";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket';

import Piece from "./Piece";
import Square from "./Square";
import { SettingsContext } from "../App/App";

import "./Board.css";


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

// true = online game, false = local game
interface BoardProps {
    loginRequired?: boolean;
}

function Board({ loginRequired = false }: BoardProps) {
    const { settings } = useContext(SettingsContext);
    
    const [reversed, setReversed] = useState<boolean>(false);
    const [url, setUrl] = useState<string|null>(null);
    useEffect(() => {
        if (loginRequired) {
            const username = sessionStorage.username;   // using sessionStorage to avoid additional api call
            if (!username) {
                console.log("Login is required for online game!!");
            }
            else {
                // automatically match http url with websocket url
                setUrl(`ws://${window.location.hostname}:8173?username=${username}`);
            }
        }
    }, [loginRequired]);

    let sendJsonMessage, lastJsonMessage: { board?: string[] };
    if (loginRequired) {
        ({ sendJsonMessage, lastJsonMessage } = useWebSocket(url, {
            onOpen: () => console.log('WebSocket connection established.'),
            // Will attempt to reconnect on all close events, such as server shutting down
            shouldReconnect: () => true,
        }));
    } else {
        sendJsonMessage = () => {};
        lastJsonMessage = {};
    }

    // update board with data from websocket
    const [board, setBoard] = useState<string[]>(lastJsonMessage?.board || initialBoard);
    if (loginRequired) {
        useEffect(() => {
            setBoard(lastJsonMessage?.board || initialBoard);
        }, [lastJsonMessage]);
    }

    // the move has to be checked by our chess model
    const handleMove = (start: number, end: number): void => {
        axios.post("/api/validate_move", {start, end}) // add params for checking in this object
       .then((response) => {
            let is_valid_move: boolean = response.data;
            if (is_valid_move) { execute_move() };
        })
       .catch(() => console.log("Something went wrong in handleMove()"));

        const execute_move = (): void => {
            const newBoard = [...board];
            const movedPiece = newBoard[start];
            newBoard[start] = "";
            newBoard[end] = movedPiece;
            loginRequired? sendJsonMessage({board: newBoard}) : setBoard(newBoard);
        };
    };


    const handleRestartGame = ():void => {
        axios.post("/api/restart_game")
            .then(() => {
                loginRequired ? sendJsonMessage({board: initialBoard}) : setBoard(initialBoard);
            })
            .catch(() => console.log("Something went wrong in handleRestartGame()"));
    };

    const handleSurrenderGame = (): void => {
        // TODO local and server-side handling
    };

    const highlightSquares = (indeces: number[]): void => {
        const squares = document.getElementsByClassName("board")[0].children;
        for (const square of squares) {
            if (indeces.includes(Number(square.getAttribute('data-position')))) {
                square.classList.add('selected');
            } else {
                square.classList.remove('selected');
            }
        }
    };

    const renderSquare = (piece: string, position: number) => {
        // determine square color
        const row = Math.floor(position / 8);
        let black: boolean;

        if (row % 2 === 0) {
            black = (position % 2 === 0) ? true : false;
        } else {
            black = (position % 2 === 0) ? false : true;
        }

        // empty square
        if (piece === "") {
            return(<Square black={black} position={position} key={position} handleMove={handleMove} highlightMoves={highlightSquares}/>);
        }

        // square with piece
        return(
            <Square black={black} position={position} key={position} handleMove={handleMove} highlightMoves={highlightSquares}>
                <Piece type={piece} />
            </Square>
        );
    };

    const renderedBoard = board.map((piece, position) => renderSquare(piece, position));
    return(
        <>
            <div className="board">
                { reversed ? renderedBoard.reverse() : renderedBoard }
            </div>
            <div>
                <Tooltip title= { settings?.showTooltips ? "Rotate your view of the board" : "" }>
                    <button onClick={() => setReversed(!reversed)} > Reverse Board </button>
                </Tooltip>
                {loginRequired ? (
                    <Tooltip title={ settings?.showTooltips ? "Forfeit and leave the match" : "" }>
                        <button onClick={() => handleSurrenderGame()}> Surrender </button>
                    </Tooltip>
                ) : (
                    <Tooltip title={ settings?.showTooltips ? "Reset the current board" : "" }>
                        <button onClick={() => handleRestartGame()}> Restart Game </button>
                    </Tooltip>
                )}
            </div>
        </>
    );
}

export default Board;
