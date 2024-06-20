import axios from "axios";
import { expect, it } from "vitest"

it("pings the server", async () => {
    const response = await axios.get("http://localhost:5173/api/hello");
    expect(response.status).toBe(200);
    expect(response.data).toEqual("Hello from express!");
});

it("resets the game", async () => {
    const response = await axios.post("http://localhost:5173/api/restart_game");
    expect(response.status).toBe(200);
    expect(response.data).toMatch("");
});

it("gets possible moves", async () => {
    let response = await axios.post("http://localhost:5173/api/possible_moves", { index: 0 });
    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);

    response = await axios.post("http://localhost:5173/api/possible_moves", { index: 6 });
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.arrayContaining([21, 23]));

    response = await axios.post("http://localhost:5173/api/possible_moves", { index: 9 });
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.arrayContaining([17, 25]));

    response = await axios.post("http://localhost:5173/api/possible_moves", { index: 54 });
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.arrayContaining([38, 46]));

    response = await axios.post("http://localhost:5173/api/possible_moves", { index: 63 });
    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);

    await expect(axios.post("http://localhost:5173/api/possible_moves", { index: -1 })).rejects.toThrowError();

    await expect(axios.post("http://localhost:5173/api/possible_moves", { index: 100 })).rejects.toThrowError();
});

it("validates a specific move", async () => {});
