import dotenv from "dotenv";
import express, { Request, Response } from "express";
import url from "url";
import ViteExpress from "vite-express";
import WebSocket, { WebSocketServer } from "ws";

import userRouter from "./routes/user.ts";
import gameRouter from "./routes/games.ts";
import Board from "./Board.ts";


// console logs in here end up in the terminal hosting the server, not the browser

dotenv.config();    // loads .env file

const app = express();
app.use(express.json()); // never forget

// HTTP
// this is a test to see if the server is alive
app.get("/api/hello", (_: Request, res: Response): void => {
    res.send("Hello from express!");
});

const currGame = new Board(); // for logic purposes
app.post("/api/validate_move", (req: Request, res: Response): void => {
    // transform list index to matrix index
    const [oldX, oldY] = [~~(req.body.start / 8), (req.body.start % 8)];
    const [newX, newY] = [~~(req.body.end / 8), (req.body.end % 8)];

    if (currGame.isValidMove(oldX, oldY, newX, newY)) {
        currGame.movePiece(oldX, oldY, newX, newY);
        res.status(200).send(true);
    } else {
        res.status(200).send(false);
    }
});

app.post("/api/possible_moves", (req: Request, res: Response): void => {
    const [x,y] = [~~(req.body.index / 8), (req.body.index % 8)];
    const moves = currGame.getTrace(x,y);
    const result = moves.map(([x, y]) => 8 * x + y);
    res.status(200).send(result);
});

app.post("/api/restart_game", (_: Request, res: Response): void => {
    currGame.resetBoard();
    res.status(200).send();
});

app.use("/api/user", userRouter);
app.use("/api/games", gameRouter);

// after defining the API, start the server
ViteExpress.listen(app, 5173, () => {
    console.log("Server listening on http://localhost:5173");
});


// WEB SOCKETS
enum Role {host, opponent, spectator};
const roles: { [username: string]: Role} = {};

type Client = { username: string, connection: WebSocket };
type Players = { host?: Client , opponent?: Client, spectators: Client[] };
const players: Players = { spectators: [] };

let currentBoard: string[] = [ // for rendering purposes
    "rook_b", "knight_b", "bishop_b", "queen_b", "king_b", "bishop_b", "knight_b", "rook_b",
    "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w",
    "rook_w", "knight_w", "bishop_w", "queen_w", "king_w", "bishop_w", "knight_w", "rook_w"
    ];

function handleMessage(message: string) { // string | Buffer
    const dataFromClient = JSON.parse(message);
    currentBoard = dataFromClient.board;
    const data = JSON.stringify({ board: currentBoard });

    players.host?.connection.send(data);
    players.opponent?.connection.send(data);
    for(const spectator of players.spectators) {
        spectator.connection.send(data);
    };
}

const server = app.listen(8173, () => {
    console.log("WebSocket server is running on port 8173");
});
const wss = new WebSocketServer({ server });
wss.on("connection", (connection, req) => { // export this to the login component?
    console.log("Received a new connection");

    const username = url.parse(req.url!, true).query.username;
    if (!username || username == "null" || typeof username != "string") {
        console.log("WebSocket connection accepted");
        return
    }

    connection.send(JSON.stringify({board: currentBoard}));
    console.log(`player ${username} joined.`);

    // reconnect logic
    if (roles[username] == 0) {
        players.host = { username, connection };
    } else if (roles[username] == 1) {
        players.opponent = { username, connection };
    } else {
        // new connection logic
        if (!("host" in players)) {
            players.host = { username, connection };
            roles[username] = Role.host;
        } else if (!("opponent" in players)) {
            players.opponent = { username, connection };
            roles[username] = Role.opponent;
        } else {
            players.spectators.push({ username, connection });
            roles[username] = Role.spectator;
        }
    }

    connection.on("message", (message: string) => handleMessage(message));
    connection.on("close", () => {
        console.log(`player ${username} left`);
        // keep host and opponent
        if (roles[username] == Role.spectator) {
            players.spectators = players.spectators.filter(
                client => client.username != username
            );
            delete roles[username];
            // TODO: close all connections when game is finished
        }
    });
});
