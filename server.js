import express from "express";
import session from "express-session";
import passport from "passport";
import DiscordStrategy from "passport-discord";

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || "shore_secret",
  resave: false,
  saveUninitialized: false,
}));

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: "/auth/callback",
  scope: ["identify"]
}, (_, __, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

// LOGIN ROUTES
app.get("/auth", passport.authenticate("discord"));

app.get("/auth/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => res.redirect("/")
);

app.get("/logout", (req, res) => {
  req.logout(() => {});
  res.redirect("/");
});

app.get("/user", (req, res) => {
  res.json(req.user || {});
});

// START SERVER
app.listen(3000, () => console.log("Shore Roleplay running on port 3000"));
