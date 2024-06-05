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

// Get user
router.get("/:username", async (req: Request, res: Response) => {
    const user = await userService.getUser(req.params.username);
    res.send({ ...user });
});

// Update user
router.put("/:username", async (req: Request, res: Response) => {
    const updatedUser = await userService.updateUser(req.params.username, req.body);
    res.send({ ...updatedUser });
});

// Delete user (Not sure if we want to allow that, because games have usernames as foreign keys)
// router.delete("/:username", async (req: Request, res: Response) => {
//     const newUser = await userService.deleteUser(req.params.username);
//     res.send({ ...newUser });
// });

// Get user settings
router.get("/:username/settings", async (req: Request, res: Response) => {
    const settings = await userService.getUserSettings(req.params.username);
    res.send({ ...settings });
})

// Change user settings
router.put("/:username/settings", async (req: Request, res: Response) => {
    const updatedSettings = await userService.updateUserSettings(req.body.username, req.body);
    res.send({ ...updatedSettings });
});

// Get user profile
router.get("/:username/profile", async (req: Request, res: Response) => {
    const profile = await userService.getUserProfile(req.params.username);
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