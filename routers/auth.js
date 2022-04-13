import express from "express";
import User from "../models/user.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticate } from "../authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email
  } = req.body;

  const user = new User({
    username,
    password: getHashedPassword(password),
    firstName,
    lastName,
    email
  });

  user.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const payload = {
        id: result.id,
        username: result.username
      }
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: 900000,
      });
      res.cookie("access_token", token, {
        maxAge: 900000,
        httpOnly: true
      });
      res.status(200).json({ success: true, fullName: user.fullName });
    }
  });
});

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!user) {
      return res.status(404).json({ success: false, msg: "Username does not exist!" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const payload = {
        id: user.id,
        username
      }
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: 900000,
      });
      res.cookie("access_token", token, {
        maxAge: 900000,
        httpOnly: true
      });
      return res.status(200).json({ success: true, firstName: user.firstName, lastName: user.lastName });
    }
    return res.status(200).json({ success: false, msg: "Wrong password!" });
  });
});

authRouter.get("/logout", (_, res) => {
  res.clearCookie("access_token").send();
});

authRouter.get("/verify-token", authenticate, (_, res) => {
  res.status(200).json({success: true});
});

const getHashedPassword = password => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export default authRouter;