import express, { Request, Response } from "express";
import ViteExpress from "vite-express";
import { WebSocketServer } from "ws";
import userRouter from "./routes/user.ts";
import gameRouter from "./routes/games.ts";

// console logs in here end up in the terminal hosting the server, not the browser

const app = express();
app.use(express.json()); // never forget

// HTTP
// this is a test to see if the server is alive
app.get("/api/hello", (req: Request, res: Response): void => {
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
const server = app.listen(8173, () => {
    console.log("WebSocket server is running on port 8173");
});
const wss = new WebSocketServer({ server });
const clients: WebSocket[] = [];
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

function handleMessage(message) {
    const dataFromClient = JSON.parse(message);
    currentBoard = dataFromClient.board;

    for(const client of clients) {
        client.send(JSON.stringify({ board: currentBoard }));
    };
}

wss.on("connection", function(connection) {
    console.log("Received a new connection");
    let id = clients.length + 1;
    connection.send(JSON.stringify({board: currentBoard}));

    clients.push(connection);
    console.log(`player ${id} connected.`);
    connection.on("message", (message) => handleMessage(message));
    connection.on("close", () => {
        console.log(`player ${id} left`);
        clients.splice(id, 1); // delete connection from array
    });
});
