import Client from "./Client";

type Players = {
     host?: Client,
     opponent?: Client, 
     spectators: Client[],
     matchID?: number
};

function getInitialPlayers(): Players {
     return { spectators: [] };
};

const players = getInitialPlayers();
 
export default Players;
export { getInitialPlayers, players };
