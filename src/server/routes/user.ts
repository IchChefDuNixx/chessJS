import express, { Request, Response, NextFunction } from "express";
import UserService from "../prisma/services/UserService";
import { authenticate, AuthRequest } from "../auth/AuthMiddleware";
import AuthService from "../auth/AuthService";


/*
    Currently errors are handled in userService.
    Errors are logged to the console.
    Return values are null if either an error occurred or no matching value was found in the database.
    No checking of request body or params yet. (E.g whether req.body matches the required type)
*/

const router = express.Router();
const userService = new UserService();
const authService = new AuthService(userService);


// Only used for logging
router.use(logger);


router.post("/login", async (req: Request, res: Response) => {
    const data = await authService.login(req.body.username, req.body.password);
    res.status(data.status).send({ message: data.message, accessToken: data.accessToken });
});

router.post("/register", async (req: Request, res: Response) => {
    const data = await authService.register(req.body.username, req.body.password);
    res.status(data.status).send({ message: data.message, accessToken: data.accessToken });
});


// Check authentication for everything apart from login and register.
router.use(authenticate);

// Get user
router.get("/", async (req: AuthRequest, res: Response) => {
    const authUser = req.user;  // user is added to the request by authentication middleware
    const result = await userService.getUser(authUser?.username);
    res.status(result.status).send({ ...result.data });
});

// Update user
router.put("/", async (req: AuthRequest, res: Response) => {
    const authUser = req.user;
    const result = await userService.updateUser(authUser?.username, req.body.data);
    res.status(result.status).send({ ...result.data });
});

// Get user settings
router.get("/settings", async (req: AuthRequest, res: Response) => {
    const authUser = req.user;
    const result = await userService.getUserSettings(authUser?.username);
    res.status(result.status).send({ ...result.data });
})

// Change user settings
router.put("/settings", async (req: AuthRequest, res: Response) => {
    const authUser = req.user;
    const result = await userService.updateUserSettings(authUser?.username, req.body.data);
    res.status(result.status).send({ ...result.data });
});

// Get user profile
router.get("/profile", async (req: AuthRequest, res: Response) => {
    const authUser = req.user;
    const result = await userService.getUserProfile(authUser?.username);
    res.status(result.status).send({ ...result.data });
});

function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Request to /api/user${req.url}`);
    next();
}

export default router;