const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const User = require("./models/userModel");
const db = require("./config/_db");
var cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const port = 8000;
const duration = 1000 * 60 * 60 * 2;
const {
  SESS_NAME = "sid",
  SESS_SECRET = "hohohooSecret",
  SESS_LIFETIME = duration,
} = process.env;
app.use(cookieParser());
app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      secure: false,
      sameSite: true,
    },
  })
);
app.use(async (req, res, next) => {
  const userid = req.session.userid;
  if (userid) {
    try {
      res.locals.user = await User.find({ _id: userid });
    } catch (error) {
      console.error(error);
    }
  }
  next();
});
app.get("/home", (req, res) => {
  const { user } = res.locals;
  res.send(user);
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      const newuser = new User({
        name: name,
        email: email,
        password: password,
      });
      await newuser.save();
      req.session.userid = newuser._id.toString();
      res.send({ allow: true });
    } else {
      res.send({ allow: false, message: "User already exists." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ allow: false, message: "Internal server error." });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const valid = await User.findOne({ email: email, password: password });
      if (valid) {
        req.session.userid = valid._id.toString();
        res.send({ allow: true });
      } else {
        res.send({ allow: false });
      }
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({ allow: false, message: "Internal server error." });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send({ allow: false });
    }
    res.clearCookie(SESS_NAME);
    res.send({ allow: true });
  });
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
