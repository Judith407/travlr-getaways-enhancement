const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Users = require("../models/user");
const User = mongoose.model("users");

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        const q = await User.findOne({ email: username}).exec();
        if (!q) {
            return done(null, false, {
                message: "Incorrect username.",
            });
        }
        return done(null, q);
      }
    )
);