const { body, validationResult } = require("express-validator");
const userService = require("../queries/User");
const asyncHandler = require("express-async-handler")


exports.dashboard = asyncHandler(async(req,res) => {
    res.render("dashboard",{
        title: "dashboard",
    })
})