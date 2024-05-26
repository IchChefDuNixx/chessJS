import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/message", (_, res) => {
    res.send("Hello from express!");
});

ViteExpress.listen(app, 5173, () => {
    console.log("Server listening on http://localhost:5173");
});
