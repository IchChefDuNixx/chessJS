import dotenv from "dotenv";
import express, { Request, Response } from "express";
import ViteExpress from "vite-express";
import WebSocket, { WebSocketServer } from "ws";
import userRouter from "./routes/user.ts";
import gameRouter from "./routes/games.ts";

// console logs in here end up in the terminal hosting the server, not the browser

dotenv.config();    // loads .env file

const app = express();
app.use(express.json()); // never forget

// HTTP
// this is a test to see if the server is alive
app.get("/api/hello", (_: Request, res: Response): void => {
    res.send("Hello from express!");
});

app.get("/api/validate_move", (req: Request, res: Response): void => {
    // TODO: import and call game logic function
    // TODO: send response with value true/false

    // mock
    res.send(true);
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
type Players = { host?: Client , opponent?: Client, spectators: Client[] }
const players: Players = { spectators: [] };

let currentBoard: string[] = [
    "rook_b", "knight_b", "bishop_b", "king_b", "queen_b", "bishop_b", "knight_b", "rook_b",
    "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w",
    "rook_w", "knight_w", "bishop_w", "king_w", "queen_w", "bishop_w", "knight_w", "rook_w"
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
wss.on("connection", function(connection) { // export this to the login component?
    console.log("Received a new connection");
    connection.send(JSON.stringify({board: currentBoard}));
    // TODO: how to get username?
    const username: string = "asd";
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

    // console.log(players);
    // console.log(roles);

    connection.on("message", (message: string) => handleMessage(message));
    connection.on("close", () => {
        console.log(`player ${username} left`);
        // keep host and opponent
        if (roles[username] == Role.spectator) {
            players.spectators = players.spectators.filter(
                client => client.username != username
            );
            delete roles[username];
        }
    });
});
