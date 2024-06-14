import { UpdateUser, UserSettings, Profile } from "../model.types";
import { User, UserPassword } from "@prisma/client";

import prisma, {PrismaServiceResponse, handleError} from "./PrismaService";


class UserService {

    async getUsers(): Promise<PrismaServiceResponse<User[]|null>> {
        const users = await prisma.user.findMany();
        return {status: 200, data: users};
    }

    async getUser(username: string): Promise<PrismaServiceResponse<User|null>> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    username: username
                }
            });
            return {status: 200, data: user};

        } catch (error) {
            return handleError(error);
        }
    }

    async getUserPassword(username: string): Promise<PrismaServiceResponse<UserPassword|null>> {
        try {
            const user = await prisma.userPassword.findFirst({
                where: {
                    username: username
                }
            });
            return {status: 200, data: user};

        } catch (error) {
            return handleError(error);
        }
    }

    async createUser(data: UserPassword): Promise<PrismaServiceResponse<User|null>> {
        try {
            const newUser = await prisma.userPassword.create({
                data: {
                    ...data,
                    user: {
                        create: {}
                    }
                },
                include: {
                    user: true
                }
            });
            return {status: 200, data: newUser.user};

        } catch (err) {
            return handleError(err);
        }
    }

    // TODO: prevent update to registered column
    async updateUser(username: string, data: Partial<UpdateUser>): Promise<PrismaServiceResponse<User|null>> {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    username: username
                },
                data: data
            });
            return {status: 200, data: updatedUser};

        } catch (err) {
            return handleError(err);
        }
    }

    async getUserSettings(username: string): Promise<PrismaServiceResponse<UserSettings|null>> {
        try {
            const settings = await prisma.user.findFirst({
                where: {
                    username: username
                },
                select: {
                    showTooltips: true,
                    darkMode: true,
                    gender_min: true,
                    gender_max: true,
                    human: true
                }
            })
            return {status: 200, data: settings};

        } catch (error) {
            return handleError(error);
        }
    }

    async updateUserSettings(username: string, data: UserSettings): Promise<PrismaServiceResponse<UserSettings|null>> {
        try {
            const updatedSettings = await prisma.user.update({
                where: {
                    username: username
                },
                data: data,
                select: {
                    showTooltips: true,
                    darkMode: true,
                    gender_min: true,
                    gender_max: true,
                    human: true
                }
            });
            return {status: 200, data: updatedSettings};

        } catch (error) {
            return handleError(error);
        }
    }

    async getUserProfile(username: string):  Promise<PrismaServiceResponse<Profile|null>> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    username: username
                },
                include: {
                    GameAsPlayer1: true,
                    GameAsPlayer2: true
                }
            });

            if (!user) {
                return {status: 400, data: null};
            }

            const history1 = user.GameAsPlayer1.map(game => {
                return {
                    id: game.id,
                    timestamp: game.timestamp,
                    opponent: game.player2,
                    victory: game.winner === user.username
                }
            });

            const history2 = user.GameAsPlayer2.map(game => {
                return {
                    id: game.id,
                    timestamp: game.timestamp,
                    opponent: game.player1,
                    victory: game.winner === user.username
                }
            });

            const play_history = history1.concat(history2);

            return ({
                status: 200,
                data:{
                    username: user.username,
                    registered: user.registered,
                    profile_picture: user.profile_picture,
                    play_history: play_history
                }
            });

        } catch (error) {
            return handleError(error);
        }
    }
}

export default UserService;
