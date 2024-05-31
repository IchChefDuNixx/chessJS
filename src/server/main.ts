import express from "express";
import ViteExpress from "vite-express";

const app = express();

// this is a test to see if the server is alive
app.get("/hello", (_, res) => {
    res.send("Hello from express!");
});



ViteExpress.listen(app, 5173, () => {
    console.log("Server listening on http://localhost:5173");
});
