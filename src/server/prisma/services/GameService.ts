import { CreateGame } from "../model.types";
import { Game } from "@prisma/client";

import prisma, {PrismaServiceResponse, handleError} from "./PrismaService";


class GameService {

    async getGames(): Promise<PrismaServiceResponse<Game[]|null>> {
        try{
            const games = await prisma.game.findMany();
            return { status: 200, data: games };

        } catch (err) {
            return handleError(err);
        }
    }

    async createGame(data: CreateGame): Promise<PrismaServiceResponse<Game|null>> {
        if (data.player1 === data.player2) {
            // cannot play against yourself
            return { status: 400, data: null };
        }
        if (data.winner && (data.winner !== data.player1 && data.winner !== data.player2)) {
            // winner not one of the players
            return { status: 400, data: null };
        }
        try {
            const newGame = await prisma.game.create({ data: data });
            return { status: 200, data: newGame };

        } catch (err) {
            return handleError(err);
        }
    }

    async updateGame(id: number, winner: string): Promise<PrismaServiceResponse<Game|null>> {
        try {
            const game = await prisma.game.findUnique({
                where: { id: id }
            });
            if (!game){
                // no game with given id
                return { status: 400, data: null };
            }
            if (winner !== game.player1 && winner !== game.player2) {
                // winner not one of the players
                return { status: 400, data: null };
            }
            const updatedGame = await prisma.game.update({
                where: { id: id },
                data: { winner: winner }
            });
            return { status: 200, data: updatedGame };

        } catch (err) {
            return handleError(err);
        }
    }

    async deleteGame(id: number) : Promise<PrismaServiceResponse<Game|null>> {
        try {
            const deletedGame = await prisma.game.delete({
                where: { id: id }
            });
            return { status: 200, data: deletedGame };

        } catch (err) {
            return handleError(err);
        }
    }
}

export default GameService;
