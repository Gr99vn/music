import "dotenv/config";
// import fs from "fs";
// import path from "path";
// import https from "https";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import getConnection from "./db/getConnection.js";
import authRouter from "./routers/auth.js";
import albumRouter from "./routers/album.js";
import { authenticate } from "./authenticate.js";
import csrf from "csurf";

const app = express();
const csrfProtection = csrf({
  cookie: true
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrfProtection);

// getConnection(process.env.DB_URL); 
getConnection(process.env.LOCAL_DB_URL);

app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
})
app.use("/api/auth", authRouter);
app.use("/api/albums", authenticate, albumRouter);

const port = process.env.PORT || 8443;

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

// https.createServer(options, app).listen(port, () => {
//   console.log(`Server is hosted on port ${port}`);
// });

app.listen(port, () => {
  console.log(`Server is hosted on port ${port}`);
});