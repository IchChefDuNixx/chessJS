import dotenv from "dotenv";
import express, { Request, Response } from "express"
import ViteExpress from "vite-express";
import { WebSocketServer } from "ws";

import { getInitialBoard, currentBoard } from "./helpers/initialBoard.ts";
import { getInitialPlayers, players } from "./helpers/Players.ts";
import { getInitialRoles, roles } from "./helpers/Role.ts";
import gameRouter from "./routes/games.ts";
import gameplayRouter from "./routes/gameplay.ts";
import userRouter from "./routes/user.ts";
import { parseUsername, handleClose, handleConnection, handleMessage } from "./websocketHandlers.ts";


dotenv.config();    // loads .env file

const app = express();
app.use(express.json()); // never forget

// this is a test to see if the server is alive
app.get("/api/hello", (_: Request, res: Response): void => {
    res.send("Hello from express!");
});

app.use("/api/user", userRouter);
app.use("/api/games", gameRouter);
app.use("/api/gameplay", gameplayRouter);

// after defining the API, start the server
ViteExpress.listen(app, 5173, () => {
    console.log("Server listening on http://localhost:5173");
});


// let currentBoard = getInitialBoard();
// let players = getInitialPlayers();
// let roles = getInitialRoles();

const server = app.listen(8173, () => {
    console.log("WebSocket server is running on port 8173");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (connection, req) => {
    console.log("Received a new connection");

    let username: string;
    try { username = parseUsername(req) }
    catch { return }

    console.log("WebSocket connection accepted");
    handleConnection(username, connection, players, roles, currentBoard);

    connection.on("message", (message: string) => {
        handleMessage(message, players, roles, currentBoard);
    });

    connection.on("close", () => {
        handleClose(username, players, roles);
    });
});
