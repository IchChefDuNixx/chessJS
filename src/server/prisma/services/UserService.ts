import { CreateUser, CreateSettings, Profile } from "../model.types";
import { User, Settings } from "@prisma/client";

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

    async getUser(id: number): Promise<User|null> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: id,
                }
            });
            return user;

        } catch (error) {
            return this.handleError(error);
        }
    }

    async createUser(data: CreateUser): Promise<User|null> {
        try {
            const newUser = await prisma.user.create({
                data: {
                    ...data,
                    settings: {
                        create: {}     // create default user settings
                    }
                },
            });
            return newUser;
    
        } catch (err) {
            return this.handleError(err);
        }
    }
    
    async createUserSettings(data: CreateSettings): Promise<Settings|null> {
        try {
            const newSettings = await prisma.settings.create({ data: data });
            return newSettings;
    
        } catch (error) {
            return this.handleError(error);
        }
    } 

    async getUserSettings(id: number): Promise<Settings|null> {
        try {
            const settings = await prisma.settings.findFirst({
                where: {id: id}
            })
            return settings;

        } catch (error) {
            return this.handleError(error);
        }
    }
    
    async updateUserSettings(data: Settings): Promise<Settings|null> {
        try {
            const updatedSettings = await prisma.settings.update({
                where: {
                    id: data.id
                },
                data: data
            });
            return updatedSettings;

        } catch (error) {
            return this.handleError(error);
        }
    }

    async getUserProfile(id: number): Promise<Profile|null> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: id,
                },
                include: {
                    GameAsPlayer1: {include: {player_2: true}},
                    GameAsPlayer2: {include: {player_1: true}},
                }
            });

            if (!user) {
                return null;
            }
        
            const history1 = user.GameAsPlayer1.map(data => {
                return {
                    id: data.id, 
                    timestamp: data.timestamp, 
                    opponent: data.player_2.username, 
                    victory: data.winnerID === user.id
                }
            });
        
            const history2 = user.GameAsPlayer2.map(data => {
                return {
                    id: data.id, 
                    timestamp: data.timestamp, 
                    opponent: data.player_1.username, 
                    victory: data.winnerID === user.id
                }
            });
        
            const play_history = history1.concat(history2);

            return ({
                id: user.id,
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
