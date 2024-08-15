const bcrypt = require("bcryptjs");
const passport = require("passport");
const userService = require("../queries/User");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "userName" },
    async (userName, password, done) => {
      try {
        const user = await userService.getUserForAuth(userName);
        if (!user) {
          return done(null, false, { message: "Incorrect UserName" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(err);
  }
});
