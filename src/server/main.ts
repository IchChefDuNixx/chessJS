import express from "express";
import ViteExpress from "vite-express";

// console logs in here end up in the terminal hosting the server, not the browser

const app = express();
app.use(express.json()); // never forget

// TODO: typescriptify request and response types. I was unable to do that.

// this is a test to see if the server is alive
app.get("/hello", (_, res): void => {
    res.send("Hello from express!");
});

app.get("/validate_move", (req, res): void => {
    // TODO: import and call game logic function
    // TODO: send response with value true/false

    // mock
    res.send(true);
});

app.get("/user_profile", (req, res): void => {
    // TODO: import and call database adapter
    // TODO: send json response with all profile data

    // mock
    res.json({
        username: "IchChefDuNixx",
        date_registered: Date(),
        profile_picture: null,
        play_history: [
        {id: 1, timestamp: "2024-05-31T12:00:00Z", opponent: "djt", victory: true},
        {id: 2, timestamp: "2023-12-25T00:00:00-05:00", opponent: "djt", victory: true},
        {id: 3, timestamp: "2022-07-04T18:30:00+02:00", opponent: "djt", victory: true},
        {id: 4, timestamp: "2021-11-15T23:59:59.999Z", opponent: "djt", victory: true},
        {id: 5, timestamp: "2020-01-01T00:00:00Z", opponent: "djt", victory: true},
        {id: 6, timestamp: "2019-06-15T10:15:30Z", opponent: "djt", victory: true},
        {id: 7, timestamp: "2018-02-28T09:00:00-08:00", opponent: "djt", victory: true},
        {id: 8, timestamp: "2017-09-21T17:45:00+01:00", opponent: "djt", victory: true},
        {id: 9, timestamp: "2016-03-29T05:30:00Z", opponent: "djt", victory: false},
        {id: 10, timestamp: "2015-08-19T22:00:00-03:00", opponent: "djt", victory: false},
        {id: 11, timestamp: "2014-04-10T14:25:00+05:30", opponent: "djt", victory: false},
        {id: 12, timestamp: "2013-12-11T11:00:00Z", opponent: "djt", victory: false},
        {id: 13, timestamp: "2012-10-05T19:20:30Z", opponent: "djt", victory: false},
        {id: 14, timestamp: "2011-07-07T08:45:00-07:00", opponent: "djt", victory: true}
    ]});
});


app.get("/user_settings", (req, res): void => {
    // TODO: import and call databse adapter
    // TODO: send json response with all user settings
    
    // mock
    res.json({"a": true, "b": true, "c": false, "d": 123})
})

app.post("/user_settings", (req, res): void => {
    // TODO: import and call database adapter
    // TOOD: parse request and store new setting values
    // TODO: send confirmation response when done

    // mock
    if ("db_store_operation_was_successful") res.send(true);
    else res.send(false);
});

// after defining the API, start the server
ViteExpress.listen(app, 5173, () => {
    console.log("Server listening on http://localhost:5173");
});
