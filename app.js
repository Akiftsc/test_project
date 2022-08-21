import express from "express";
import pageRouter from "./routers/pageRoute.js";
import photoRouter from "./routers/photoRoute.js";
import dotenv from "dotenv";
import conn from "./db.js";

dotenv.config();

//* Db connection

conn();

const app = express();
const port = process.env.PORT;

//* Ejs Template Engine

app.set("view engine", "ejs");

//* Static Files Middleware

app.use(express.static("public"));
app.use(express.json());

//* Routes

app.use("/", pageRouter);
app.use("/photos", photoRouter);

app.listen(port, () => {
  console.log(`Server is up while using port ${port}`);
});
