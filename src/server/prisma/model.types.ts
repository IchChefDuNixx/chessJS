import { User, Game } from "@prisma/client";


export type CreateUser = Pick<User, 'username' | 'profile_picture'>;

export type CreateGame = Omit<Game, "id" | "timestamp">;

export type UserSettings = Pick<User, "set_a" | "set_b" | "set_c" | "set_d" >;

export type PlayHistory = {
    id: number, 
    timestamp: Date, 
    opponent: string, 
    victory: boolean
};

export type Profile = {
    username: string;
    registered: Date;
    profile_picture: string | null;
    play_history: PlayHistory[]
};