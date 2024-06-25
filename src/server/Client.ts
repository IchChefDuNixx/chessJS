import WebSocket from "ws";

type Client = {
    username: string,
    connection: WebSocket
};

export default Client;
