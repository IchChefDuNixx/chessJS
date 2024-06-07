import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export interface AuthRequest extends Request {
    user?: JwtPayload
}


export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {

    const authHeader = req.headers["authorization"]
    const token = authHeader?.split(" ")[1];

    if (!process.env.ACCESS_TOKEN_SECRET)
        throw new Error("Env variable not defined.");

    if (!token)
        return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);

        if (typeof user === "string")
            return res.sendStatus(403);
        
        req.user = user;
        next();
    });
}