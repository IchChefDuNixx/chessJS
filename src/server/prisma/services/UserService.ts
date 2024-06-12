import { UpdateUser, UserSettings, Profile } from "../model.types";
import { User, UserPassword } from "@prisma/client";

import prisma from "./PrismaService";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


class UserService {

    handleError(err: any): null {
        if (err instanceof PrismaClientKnownRequestError) {
            console.log(err.message)
        } else {
            console.log(err);
        }
        return null
    }

    async getUsers(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }

    async getUser(username: string): Promise<User|null> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    username: username
                }
            });
            return user;

        } catch (error) {
            return this.handleError(error);
        }
    }

    async getUserPassword(username: string): Promise<UserPassword|null> {
        try {
            const user = await prisma.userPassword.findFirst({
                where: {
                    username: username
                }
            });
            return user;

        } catch (error) {
            return this.handleError(error);
        }
    }

    async createUser(data: UserPassword): Promise<User|null> {
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
            return newUser.user;

        } catch (err) {
            return this.handleError(err);
        }
    }

    // TODO: prevent update to registered column
    async updateUser(username: string, data: Partial<UpdateUser>): Promise<User|null> {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    username: username
                },
                data: data
            });
            return updatedUser;

        } catch (err) {
            return this.handleError(err);
        }
    }

    async getUserSettings(username: string): Promise<UserSettings|null> {
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
            return settings;

        } catch (error) {
            return this.handleError(error);
        }
    }

    async updateUserSettings(username: string, data: UserSettings): Promise<UserSettings|null> {
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
            return updatedSettings;

        } catch (error) {
            return this.handleError(error);
        }
    }

    async getUserProfile(username: string): Promise<Profile|null> {
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
                return null;
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
                username: user.username,
                registered: user.registered,
                profile_picture: user.profile_picture,
                play_history: play_history
            });

        } catch (error) {
            return this.handleError(error);
        }
    }
}

export default UserService;
