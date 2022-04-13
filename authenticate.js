import jwt from "jsonwebtoken";
import User from "./models/user.js";

export function authenticate(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json({ success: false, msg: "Invalid access token!" })
  }
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  User.findOne({ id: decoded.id }, (err, user) => {
    if (!err) {
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(401).json({ success: false, msg: "Invalid token!" });
      }
    } else {
      return res.status(401).json({ success: false, msg: err.message });
    }
  });
}