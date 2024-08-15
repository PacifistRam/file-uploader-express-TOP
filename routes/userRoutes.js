const express = require("express")
const userRouter = express.Router();
const{ checkLoggedIn, ensureAuthenticated } = require("../middleware/authMiddleware")
const userController =require("../controllers/userController")

// Log in routes
userRouter.get("/log-in",checkLoggedIn, userController.getLogIn);
userRouter.post("/log-in", userController.postLogIn);

// log out route
userRouter.get("/log-out", userController.logOut)

// sign-up routes
userRouter.get("/sign-up",checkLoggedIn, userController.getSignUp);
userRouter.post("/sign-up", userController.postSignUp);

// home route
userRouter.get("/",checkLoggedIn, userController.getHome);
userRouter.get("/user/:id", userController.getSingleUser);


module.exports = userRouter