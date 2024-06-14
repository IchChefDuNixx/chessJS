import { CreateGame } from "../model.types";
import { Game } from "@prisma/client";

import prisma, {PrismaServiceResponse, handleError} from "./PrismaService";



class GameService {

    async getGames(): Promise<PrismaServiceResponse<Game[]|null>> {
        try{
            const games = await prisma.game.findMany();
            return {status: 200, data: games};
            
        } catch (err) {
            return handleError(err);
        }
    }

    async createGame(data: CreateGame): Promise<PrismaServiceResponse<Game|null>> {
        try {
            const newGame = await prisma.game.create({ data: data });
            return {status: 200, data: newGame};
    
        } catch (err) {
            return handleError(err);
        }
    }

    async deleteGame(id: number) : Promise<PrismaServiceResponse<Game|null>> {
        try {
            const deletedGame = await prisma.game.delete({
                where: {id: id}
            });
            return {status: 200, data: deletedGame};
    
        } catch (err) {
            return handleError(err);
        }
    }
}

export default GameService;
