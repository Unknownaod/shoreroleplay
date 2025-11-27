require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: `${process.env.DOMAIN}/auth/callback`,
  scope: ["identify"]
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

app.get("/auth", passport.authenticate("discord"));

app.get("/auth/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => res.redirect("/")
);

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

app.get("/user", (req, res) => {
  res.json(req.user ?? {});
});

app.listen(3000, () =>
  console.log("Shore Roleplay Auth Server running on port 3000")
);
