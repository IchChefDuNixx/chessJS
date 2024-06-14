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
    const newGame = await gameService.createGame({
        winner: req.body.winner,
        player1: req.body.player1,
        player2: req.body.player2,
    });
    res.send({ ...newGame });
});

// Delete game
router.delete("/", async (req: Request, res: Response) => {
    const newGame = await gameService.deleteGame(req.body.id);
    res.send({ ...newGame });
});


export default router;