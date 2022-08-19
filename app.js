import express from "express";
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

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Server is up while using port ${port}`);
});
