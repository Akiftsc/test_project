import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import BodyParser from "body-parser";
import pageRouter from "./routers/pageRoute.js";
import photoRouter from "./routers/photoRoute.js";
import userRouter from "./routers/userRoute.js";
import conn from "./db.js";
import { checkUser } from "./middlewares/authMiddleware.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

//* Coludinary Config

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//* Db connection

conn();

const app = express();
const port = process.env.PORT;

//* Ejs Template Engine

app.set("view engine", "ejs");

//* Static Files Middleware

app.use(express.static("public"));
app.use(express.json());
app.use(express.text());
app.use(BodyParser.json());
BodyParser.urlencoded({ extended: true });
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

//* Routes
app.use("*", checkUser);
app.use("/", pageRouter);
app.use("/photos", photoRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is up while using port ${port}`);
});
