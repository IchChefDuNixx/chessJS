import express, { NextFunction, Request, Response } from "express";
import GameService from "../prisma/services/GameService";


const router = express.Router();
const gameService = new GameService();

// router.use(logger);

// Get all games
router.get("/", async (_: Request, res: Response) => {
    const result = await gameService.getGames();
    res.status(result.status).send({ ...result.data });
});

// Create new game
router.post("/", async (req: Request, res: Response) => {
    const result = await gameService.createGame({
        player1: req.body.player1,
        player2: req.body.player2,
        winner: req.body.winner,
    });
    res.status(result.status).send({ ...result.data });
});

// Update game
router.put("/", async (req: Request, res: Response) => {
    const result = await gameService.updateGame(parseInt(req.body.id) , req.body.winner);
    res.status(result.status).send({ ...result.data });
});

// Delete game
router.delete("/", async (req: Request, res: Response) => {
    const result = await gameService.deleteGame(req.body.id);
    res.status(result.status).send({ ...result.data });
});

function logger(req: Request, _: Response, next: NextFunction) {
    console.log(`Request to /api/games${req.url}`);
    console.log("Data: ", req.body);
    next();
}

export default router;
