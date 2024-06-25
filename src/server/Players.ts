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
 
export default Players;
export { getInitialPlayers };
