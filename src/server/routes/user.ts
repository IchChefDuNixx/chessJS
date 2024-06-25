import express, { Request, Response, NextFunction } from "express";
import fileUpload from "express-fileupload";

import { authenticate, AuthRequest } from "../auth/AuthMiddleware";
import AuthService from "../auth/AuthService";
import UserService from "../prisma/services/UserService";


/*
    Currently errors are handled in userService.
    Errors are logged to the console.
    Return values are null if either an error occurred or no matching value was found in the database.
    No checking of request body or params yet. (E.g whether req.body matches the required type)
*/

const uploadDir = "src/uploads/";

const router = express.Router();
const userService = new UserService();
const authService = new AuthService(userService);


// Only used for logging
// router.use(logger);


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

// Check if user is logged in
router.get("/logged_in", async (req: AuthRequest, res: Response) => {
    const authUser = req.user;  // user is added to the request by authentication middleware
    res.status(200).send({ username: authUser?.username });
});

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

// Upload profile picture
router.post("/upload", fileUpload(), (req: AuthRequest, res: Response) => {
    if (!req.files)
        return res.status(400).send("No file received!");

    const image = req.files.image;
    
    if (Array.isArray(image))
        return res.status(400).send("Received more than one image!");

    const username = req.user?.username;
    const date = new Date().getTime();
    const [type, subtype] = image.mimetype.split("/");
    const image_name = username + "_" + date + "." + subtype;

    image.mv(uploadDir + image_name);
    res.send({profile_picture: uploadDir + image_name});
});

function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Request to /api/user${req.url}`);
    console.log("Data: ", req.body);
    next();
}

export default router;