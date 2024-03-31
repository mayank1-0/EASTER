const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/models/index");

const initializePassport = () => {
  // Passport local strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      async function (username, password, done) {
        try {
          const [user] = await db.sequelize.query(
            "SELECT * FROM users WHERE username = :username",
            {
              replacements: { username },
              type: db.sequelize.QueryTypes.SELECT,
            }
          );

          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          if (user.password !== password) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        } catch (error) {
          console.error("Error in LocalStrategy:", error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    try {
      done(null, user.id);
    } catch (error) {
      console.error("Error in serializeUser:", error);
      done(error);
    }
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const [user] = await db.sequelize.query(
        "SELECT * FROM users WHERE id = :id",
        {
          replacements: { id },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      done(null, user);
    } catch (error) {
      console.error("Error in deserializeUser:", error);
      done(error);
    }
  });

  return passport;
};

module.exports = initializePassport;
