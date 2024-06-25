import axios from "axios";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket';
import { SettingsContext } from "../App/App";
import Piece from "./Piece";
import Square from "./Square";
import "./Board.css";
import Lottie from 'lottie-react';
import animationExplosion from '../../assets/Animation-explosion.json';

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
    const [url, setUrl] = useState<string | null>(null);
    const [istaken, setistaken] = useState<boolean>(false);
    const [board, setBoard] = useState<string[]>(initialBoard);
    const [lastMoveEnd, setLastMoveEnd] = useState<number | null>(null);
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    let sendJsonMessage, lastJsonMessage: { board?: string[] };

    useEffect(() => {
        if (loginRequired) {
            const username = sessionStorage.username;
            if (!username) {
                console.log("Login is required for online game!!");
            } else {
                setUrl(`ws://${window.location.hostname}:8173?username=${username}`);
            }
        }
    }, [loginRequired]);

    if (loginRequired) {
        ({ sendJsonMessage, lastJsonMessage } = useWebSocket(url, {
            onOpen: () => console.log('WebSocket connection established.'),
            shouldReconnect: () => true,
        }));
    } else {
        sendJsonMessage = () => {};
        lastJsonMessage = {};
    }

    useEffect(() => {
        if (loginRequired) {
            setBoard(lastJsonMessage?.board || initialBoard);
        }
    }, [lastJsonMessage, loginRequired]);

    const handleMove = (start: number, end: number): void => {
        const username = sessionStorage.username;

        axios.post("/api/validate_move", { start, end, isOnline: loginRequired, username })
            .then((response) => {
                let is_valid_move: boolean = response.data;
                if (is_valid_move) {
                    execute_move(start, end);
                }
            })
            .catch(() => console.log("Something went wrong in handleMove()"));
    };

    const execute_move = (start: number, end: number): void => {
        const newBoard = [...board];
        const movedPiece = newBoard[start];
        newBoard[start] = "";
        if (board[end] === "") {
            setistaken(false);
        } else {
            setistaken(true);
        }
        newBoard[end] = movedPiece;
        setLastMoveEnd(end);
        setShowAnimation(true);

        setTimeout(() => {
            setShowAnimation(false);
        }, 500);

        loginRequired ? sendJsonMessage({ board: newBoard }) : setBoard(newBoard);
    };

    const handleRestartGame = (): void => {
        axios.post("/api/restart_game")
            .then(() => {
                loginRequired ? sendJsonMessage({ board: initialBoard }) : setBoard(initialBoard);
                setistaken(false);
                setLastMoveEnd(null);
            })
            .catch(() => console.log("Something went wrong in handleRestartGame()"));
    };

    const handleSurrenderGame = (): void => {
        // TODO local and server-side handling
    };

    const highlightSquares = (indices: number[]): void => {
        const squares = document.getElementsByClassName("board")[0].children;
        for (const square of squares) {
            if (indices.includes(Number(square.getAttribute('data-position')))) {
                square.classList.add('selected');
            } else {
                square.classList.remove('selected');
            }
        }
    };

    const renderSquare = (piece: string, position: number) => {
        const row = Math.floor(position / 8);
        const black = (row % 2 === 0) ? (position % 2 === 0) : (position % 2 !== 0);

        if (istaken && showAnimation && position === lastMoveEnd) {
            // Render Lottie animation when a piece is taken
            return (
                <Square black={black} position={position} key={position} handleMove={handleMove} highlightMoves={highlightSquares}>
                    <Lottie animationData={animationExplosion} />
                </Square>
            );
        }

        if (piece === "") {
            return (
                <Square black={black} position={position} key={position} handleMove={handleMove} highlightMoves={highlightSquares} />
            );
        }

        return (
            <Square black={black} position={position} key={position} handleMove={handleMove} highlightMoves={highlightSquares}>
                <Piece type={piece} />
            </Square>
        );
    };

    const renderedBoard = board.map((piece, position) => renderSquare(piece, position));

    return (
        <>
            <div className="board">
                {reversed ? renderedBoard.reverse() : renderedBoard}
            </div>
            <div>
                <Tooltip title={settings?.showTooltips ? "Rotate your view of the board" : ""}>
                    <button onClick={() => setReversed(!reversed)}>Reverse Board</button>
                </Tooltip>
                {loginRequired ? (
                    <Tooltip title={settings?.showTooltips ? "Forfeit and leave the match" : ""}>
                        <button onClick={() => handleSurrenderGame()}>Surrender</button>
                    </Tooltip>
                ) : (
                    <Tooltip title={settings?.showTooltips ? "Reset the current board" : ""}>
                        <button onClick={() => handleRestartGame()}>Restart Game</button>
                    </Tooltip>
                )}
            </div>
        </>
    );
}

export default Board;
