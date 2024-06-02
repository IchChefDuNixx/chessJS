import express from "express";
import { Request, Response, NextFunction } from "express";
import UserService from "../prisma/services/UserService";


/*
    Currently errors are handled in user.controller. 
    Errors are logged to the console.
    Return values are null if either an error occurred or no matching value was found in the database.
    No checking of request body or params yet. (E.g whether req.body matches the required type)
*/


const router = express.Router();
const userService = new UserService();

// Only used for logging
router.use(logger);

// Get all users
router.get("/", async (req: Request, res: Response) => {
    const users = await userService.getUsers();
    res.send({ ...users });
});

// Create new user
router.post("/", async (req: Request, res: Response) => {
    const newUser = await userService.createUser(req.body);
    res.send({ ...newUser });
});

// Get user settings
router.get("/settings/:id", async (req: Request, res: Response) => {
    const settings = await userService.getUserSettings(parseInt(req.params.id));
    res.send({ ...settings });
})

// Create user settings (default settings are automatically created when new user is created)
router.post("/settings", async (req: Request, res: Response) => {
    const newSettings = await userService.createUserSettings(req.body);
    res.send({ ...newSettings });
});

// Change user settings
router.put("/settings/:id", async (req: Request, res: Response) => {
    const updatedSettings = await userService.updateUserSettings(req.body);
    res.send({ ...updatedSettings });
});

// Get user profile
router.get("/profile/:id", async (req: Request, res: Response) => {
    const profile = await userService.getUserProfile(parseInt(req.params.id));
    res.send({ ...profile });
});

function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Request to user${req.url}`);
    // console.log("params:", req.params);
    // console.log("query:", req.query);
    // console.log("body:", req.body);
    next();
}

export default router;