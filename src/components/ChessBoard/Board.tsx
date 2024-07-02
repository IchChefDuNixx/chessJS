import axios from "axios";
import Lottie from 'lottie-react';
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket from 'react-use-websocket';

import { SettingsContext } from "../App/App";
import animationExplosion from '../../assets/Animation-explosion.json';
import Piece from "./Piece";
import { getInitialBoard } from "../../server/helpers/initialBoard";
import Square from "./Square";

import "./Board.css";


const initialBoard: string[] = getInitialBoard();

// true = online game, false = local game
interface BoardProps {
    loginRequired?: boolean;
}

function Board({ loginRequired = false }: BoardProps) {
    const { settings } = useContext(SettingsContext);
    const navigate = useNavigate();
    const [reversed, setReversed] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(null);
    const [istaken, setistaken] = useState<boolean>(false);
    const [board, setBoard] = useState<string[]>(initialBoard);
    const [lastMoveEnd, setLastMoveEnd] = useState<number | null>(null);
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    let sendJsonMessage, lastJsonMessage: { board?: string[], gameOver?: boolean };

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
            if (lastJsonMessage?.gameOver) {
                handleGameOver();
            }
        }
    }, [lastJsonMessage, loginRequired]);

    // TODO: make more smooth
    const handleGameOver = (): void => {
        handleRestartGame();
        alert("The game has concluded!");
        navigate("/home");
    };

    const handleMove = (start: number, end: number): void => {
        const username = sessionStorage.username;

        axios.post("/api/gameplay/validate_move", { start, end, isOnline: loginRequired, username })
            .then((response) => {
                const isValidMove: boolean = response.data.isValid;
                const gameOver: boolean = response.data.gameOver;
                if (isValidMove) {
                    execute_move(start, end, gameOver);
                }
            }).catch(() => {
                console.log("Something went wrong in handleMove()");
            });
    };

    const execute_move = (start: number, end: number, gameOver: boolean): void => {
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

        if (loginRequired) {
            sendJsonMessage({ board: newBoard, gameOver });
        } else {
            setBoard(newBoard);
            gameOver && handleGameOver(); // short-circuit evaluation
        }
    };

    // Local only
    const handleRestartGame = (): void => {
        axios.post("/api/gameplay/restart_game", { isOnline: false })
            .then(() => {
                setBoard(initialBoard);
                setistaken(false);
                setLastMoveEnd(null);
            }).catch(() => {
                console.log("Something went wrong in handleRestartGame()");
            });
    };

    // Online only
    const handleSurrenderGame = (): void => {
        const username = sessionStorage.username;

        axios.post("/api/gameplay/match_info", { username })
            .then(res => {
                const id = res.data.id;
                const winner = res.data.opponent;
                if (winner) {
                    axios.put("/api/games/", { id, winner })
                        .then(() => {
                            axios.post("/api/gameplay/restart_game", { isOnline: true })
                                .then(() => {
                                    // Everything was successful
                                    sendJsonMessage({ board: initialBoard, gameOver: true });
                                }).catch(e => { console.log(e) });
                        }).catch(e => { console.log(e) });
                } else { navigate("/home") };
            }).catch(() => {
                console.log("Something went wrong in handleSurrenderGame()");
            });
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
                    <button onClick={() => setReversed(!reversed)}> Reverse Board </button>
                </Tooltip>
                {loginRequired ? (
                    <Tooltip title={settings?.showTooltips ? "Forfeit and leave the match" : ""}>
                        <button onClick={handleSurrenderGame}> Surrender </button>
                    </Tooltip>
                ) : (
                    <Tooltip title={settings?.showTooltips ? "Reset the current board" : ""}>
                        <button onClick={handleRestartGame}> Restart Game </button>
                    </Tooltip>
                )}
            </div>
        </>
    );
}

export default Board;
