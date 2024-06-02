import { CreateGame } from "../model.types";
import { Game } from "@prisma/client";

import prisma from "./PrismaService";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


class GameService {

    handleError(err: any): null {
        if (err instanceof PrismaClientKnownRequestError) {
            console.log(err.message)
        } else {
            console.log(err);
        }
        return null
    }

    async getGames(): Promise<Game[]> {
        const games = await prisma.game.findMany();
        return games;
    }

    async createGame(data: CreateGame): Promise<Game|null> {
        try {
            const newGame = await prisma.game.create({ data: data });
            return newGame;
    
        } catch (err) {
            return this.handleError(err);
        }
    }
}

export default GameService;
