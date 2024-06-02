import { User, Settings, Game } from "@prisma/client";


export type CreateUser = Omit<User, 'id' | 'registered'>;

export type CreateSettings = Pick<Settings, "id">;

export type CreateGame = Omit<Game, "id" | "timestamp">;

export type PlayHistory = {
    id: number, 
    timestamp: Date, 
    opponent: string, 
    victory: boolean
};

export type Profile = {
    id: number;
    username: string;
    registered: Date;
    profile_picture: string | null;
    play_history: PlayHistory[]
};