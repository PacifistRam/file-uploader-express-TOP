const { Router } =  require("express");
const dashboardController = require("../controllers/dashboardController")
const{ checkLoggedIn, ensureAuthenticated } = require("../middleware/authMiddleware")
const dashboardRouter = Router();
const cloudinary = require("../middleware/cloudinary")
// dashboard router

dashboardRouter.get("/", ensureAuthenticated, dashboardController.dashboard)

// create folder post route
dashboardRouter.post("/create-folder",ensureAuthenticated, dashboardController.postCreateFolder)

// create file Post route
dashboardRouter.post("/create-file", dashboardController.postCreateFile)

// delete file routes
dashboardRouter.get("/file/:id/delete", dashboardController.getDeleteFile) 
dashboardRouter.post("/file/:id/delete", dashboardController.postDeleteFile) 

// single folder Route
dashboardRouter.get("/folder/:id",ensureAuthenticated, dashboardController.getSingleFolder)





module.exports = dashboardRouter