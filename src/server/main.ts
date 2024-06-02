import express from "express";
import { Request, Response } from "express";
import ViteExpress from "vite-express";
import userRouter from "./routes/user.ts";
import gameRouter from "./routes/games.ts";

// console logs in here end up in the terminal hosting the server, not the browser

const app = express();
app.use(express.json()); // never forget


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

app.use("api/user", userRouter);
app.use("api/games", gameRouter);

// after defining the API, start the server
ViteExpress.listen(app, 5173, () => {
    console.log("Server listening on http://localhost:5173");
});
