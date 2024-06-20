import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserService from "../prisma/services/UserService";


class AuthService {
    constructor(private readonly userService: UserService) {};

    async login(username: string, password: string): Promise<{status: number, message: string, accessToken: string}> {
        // get user from db
        const result = await this.userService.getUserPassword(username);
        const user = result.data;

        if (!user) {
            return { "status": 400, "message": "User not found", "accessToken": "" };
        }

        // check password
        const correct_password = await bycrypt.compare(password, user.password);
        if (!correct_password) {
            return { "status": 400, "message": "Authentication failed", "accessToken": "" };
        }

        // create access token
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("Env variable not defined");
        }

        const token = jwt.sign(
            { username: username},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        return { "status": 200, "message": "Authenticated", "accessToken": token };
    }

    async register(username: string, password: string): Promise<{status: number, message: string, accessToken: string}> {
        // check if username is empty
        if (username === "") {
            return { "status": 400, "message": "You must provide a username", "accessToken": "" };
        }

        // check if password is empty
        if (password === "") {
            return { "status": 400, "message": "Password cannot be empty", "accessToken": "" };
        }

        // check if user exists
        if ((await this.userService.getUser(username)).data) {
            return { "status": 400, "message": "User already exists", "accessToken": "" };
        }

        // hash password
        const password_hash = await bycrypt.hash(password, 10);

        // create user
        const result = await this.userService.createUser({
            username: username,
            password: password_hash
        });
        const newUser = result.data;
        if (!newUser) {
            return { "status": result.status, "message": "User creation failed", "accessToken": "" };
        }
        
        // automatically log in
        return this.login(username, password);
    }
}

export default AuthService;
