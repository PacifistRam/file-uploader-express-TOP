const { Router } =  require("express");
const dashboardController = require("../controllers/dashboardController")
const{ checkLoggedIn, ensureAuthenticated } = require("../middleware/authMiddleware")
const dashboardRouter = Router();

// dashboard router

dashboardRouter.get("/", ensureAuthenticated, dashboardController.dashboard)



module.exports = dashboardRouter