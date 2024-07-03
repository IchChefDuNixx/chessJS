import axios from "axios";
import { IncomingMessage } from "http";
import url from "url";
import { WebSocket } from "ws";

import Players, { players } from "./helpers/Players";
import Role, { Roles } from "./helpers/Role";
import { getInitialBoard } from "./helpers/initialBoard";


function parseUsername(req: IncomingMessage) : string {
    const username = url.parse(req.url!, true).query.username;
    if (!username || username == "null" || typeof username != "string") {
        throw new Error(`Invalid username! (${username})`);
    }
    return username;
}

function handleConnection(username: string, connection: WebSocket, players: Players, roles: Roles, currentBoard: string[]): void {
    // reconnect logic
    if (roles[username] === Role.host) {
        players.host = { username, connection };
    } else if (roles[username] === Role.opponent) {
        players.opponent = { username, connection };
    } else {
        // new connection logic
        if (!("host" in players)) {
            players.host = { username, connection };
            roles[username] = Role.host;

        } else if (!("opponent" in players)) {
            players.opponent = { username, connection };
            roles[username] = Role.opponent;

            axios.post(`http://localhost:5173/api/games`, {
                player1: players.host?.username,
                player2: players.opponent?.username
            }).then(res => {
                console.log(res.status);
                players.matchID = parseInt(res.data.id);
            }).catch();

        } else {
            players.spectators.push({ username, connection });
            roles[username] = Role.spectator;
        }
    }

    connection.send(JSON.stringify({board: currentBoard}));
    console.log(`player ${username} (${Role[roles[username]]}) joined`);
};

function handleMessage(message: string, players: Players, roles: Roles, currentBoard: string[]): void {
    const dataFromClient = JSON.parse(message);
    currentBoard = dataFromClient.board;
    const gameOver = dataFromClient.gameOver ? true : false;
    const data = JSON.stringify({ board: currentBoard, gameOver });

    players.host?.connection.send(data);
    players.opponent?.connection.send(data);
    for(const spectator of players.spectators) {
        spectator.connection.send(data);
    };

    if (gameOver) {
        currentBoard.splice(0, 64,...getInitialBoard());
    }
};

function handleClose(username: string, players: Players, roles: Roles): void {
    console.log(`player ${username} (${Role[roles[username]]}) left`);
    // keep host and opponent
    if (roles[username] === Role.spectator) {
        players.spectators = players.spectators.filter(
            client => client.username != username
        );
        delete roles[username];
    }
};

function disconnectAll(): void {
    for (const player of [players.host, players.opponent, ...players.spectators]) {
        player?.connection.close();
    }
};

export { disconnectAll, handleClose, handleConnection, handleMessage, parseUsername };
