import express, { Request, Response } from "express";

import Board from "../Board";
import { BoardIndexToListIndex, listIndexToBoardIndex } from "../helpers/indexConverter";
import { players } from "../helpers/Players";
import Role, { roles } from "../helpers/Role";
import { disconnectAll } from "../websocketHandlers";


const router = express.Router();
const currGame = new Board();

router.post("/validate_move", (req: Request, res: Response): void => {
    try {
        const [oldX, oldY] = listIndexToBoardIndex(req.body.start);
        const [newX, newY] = listIndexToBoardIndex(req.body.end);

        let playerColor = currGame.getTurn();
        // effectively ignore playerColor for local games
        if (req.body.isOnline) {
            const playerRole = roles[req.body.username];
            if (playerRole == Role.spectator) {
                res.status(200).send({ isValid: false, gameOver: false});
                return;
            }
            playerColor = (playerRole == Role.host) ? "w" : "b";
        }

        if (currGame.isValidMove(oldX, oldY, newX, newY, playerColor)) {
            currGame.movePiece(oldX, oldY, newX, newY);
            res.status(200).send({ isValid: true, gameOver: currGame.getIsKingTaken() });
        } else {
            res.status(200).send({ isValid: false, gameOver: currGame.getIsKingTaken() });
        }
        return;
    } catch {
        res.sendStatus(400);
    }
});

router.post("/possible_moves", (req: Request, res: Response): void => {
    try {
        const [x,y] = listIndexToBoardIndex(req.body.index);
        const moves = currGame.getTrace(x,y);
        const result = moves.map(BoardIndexToListIndex);
        res.status(200).send(result);
    } catch {
        res.sendStatus(400);
    }
});

router.post("/restart_game", (req: Request, res: Response): void => {
    try {
        if (req.body.isOnline) {
            disconnectAll();
        }
        currGame.resetBoard();
        res.sendStatus(200);
    } catch {
        res.sendStatus(400);
    }
});

router.post("/match_info", (req: Request, res: Response): void => {
    const playerRole = roles[req.body.username];
    const opponent = (playerRole === Role.host) ? players.opponent?.username : players.host?.username;
    const id = players.matchID;

    res.status(200).send({ playerRole: Role[playerRole], opponent, id });
});

export default router;
