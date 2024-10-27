const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs")
const userService = require("../queries/User");
const asyncHandler = require("express-async-handler")

// passport config
require("../auth/passportConfig")
// get all users

// home/ index route
exports.getHome = async(req, res) => {
    res.render("index",{
        title:"Home"
    })
}


// login routes get and post
exports.getLogIn = asyncHandler(async(req, res) => {
    res.render("log-in",{
        title: "Log-In",
        errorMessage: null,
        errors:null,
        formField:null,
        register:req.query.registered
    })
})

exports.postLogIn = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty ")
    .isLength({ min: 4, max: 15 })
    .withMessage(
      "Username needs to be more than 4 characters and less than 15 characters"
    )
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("password field cannot be empty")
    .isLength({ min: 8 })
    .withMessage("password needs to have minimum 8 characters")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("log-in", {
        title: "Log-in",
        errorMessage: null,
        errors: errors.array(),
        formField: req.body,
        register: req.query.registered,
      });
    } else {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          // if authentication fails, rerender log-in again
          console.log("problem with log-in");
          return res.render("log-in", {
            title: "Log-in",
            errorMessage: info.message || "Invalid Credentials",
            errors: null,
            formField: req.body,
            register: req.query.registered,
          });
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect("/dashboard");
        });
      })(req, res, next);
    }
  }),
]; 

exports.logOut = async(req, res) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        res.redirect("/")
    })
}

// sign-up get and post route
exports.getSignUp = asyncHandler(async (req, res) => {
    res.render("sign-up",{
        title: "Sign-up Form",
        errors: null,
        dbErrorMsg: null,
        formField: null
    })
})

exports.postSignUp = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 4, max: 15 })
    .withMessage("Username need to be between 4 to 15 characters ")
    .matches(/^[^\s'"<>/]+$/)
    .withMessage("username cannot contain any punctuation marks or whitespaces")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("There needs to be a valid email")
    .escape(),
  
    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[\d]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#]/)
    .withMessage(
      "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"
    )
    .matches(/^(?!.*\s).+$/)
    .withMessage("Password cannot contain spaces"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm Password Field cannot be empty")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("sign-up", {
        title: "Sign Up",
        errors: errors.array(),
        dbErrorMsg: null,
        formField: req.body,
      });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const result = await userService.createNewUser(
          req.body.userName,
          req.body.email,
          hashedPassword
        );
        if (result.success === true) {
          res.redirect("/log-in?registered=true");
        } else {
          res.render("sign-up", {
            title: "sign-up form",
            errors: null,
            dbErrorMsg: result.message,
            formField: req.body,
          });
        }
      } catch (error) {
        return next(error)
      }
    }
  }),
];



// test functions
exports.getAllUsers = asyncHandler(async(req, res, next) => {
     const users = await userService.getAllUsers();
     res.json(users);
})

exports.getSingleUser = asyncHandler(async(req, res, next) => {
    const id = req.params.id
    const user = await userService.getUserById(id)
    res.json(user)
})