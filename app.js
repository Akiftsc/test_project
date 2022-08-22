import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import pageRouter from "./routers/pageRoute.js";
import photoRouter from "./routers/photoRoute.js";
import userRouter from "./routers/userRoute.js";
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//* Routes

app.use("/", pageRouter);
app.use("/photos", photoRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is up while using port ${port}`);
});
