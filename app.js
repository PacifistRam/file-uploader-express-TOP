const express = require("express");
const app = express()
const engine = require("ejs-mate")
const path = require('path')
const session = require("express-session")
const userRouter = require("./routes/userRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const { PrismaClient } = require("@prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");
require("dotenv").config();




app.use(express.static('public'))
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, //ms
    },
    secret: "a cat ate my rat",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})

app.use(express.json());
app.use(express.urlencoded({ extended: true}))


app.use("/", userRouter);
app.use("/dashboard", dashboardRouter);




const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



