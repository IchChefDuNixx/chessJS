import express from "express";
import { Request, Response } from "express";
import GameService from "../prisma/services/GameService";


const router = express.Router();
const gameService = new GameService();

// Get all games
router.get("/", async (req: Request, res: Response) => {
    const games = await gameService.getGames();
    res.send({ ...games });
});

// Create new game
router.post("/", async (req: Request, res: Response) => {
    const newGame = await await gameService.createGame({
        winnerID: parseInt(req.body.winnerID),
        player1Id: parseInt(req.body.player1Id),
        player2Id: parseInt(req.body.player2Id),
    });
    res.send({ ...newGame });
});

export default router;