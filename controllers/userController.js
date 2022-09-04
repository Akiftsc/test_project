import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Photo from "../models/photoModel.js";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user: user._id });
  } catch (err) {
    let errs = {};

    if (err.code === 11000) {
      errs.email = "That email has already registered";
    }

    if (err.name === "ValidationError") {
      Object.keys(err.errors).forEach((key) => {
        errs[key] = err.errors[key].message;
      });
    }

    res.status(400).json(errs);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      res.status(401).json({
        succeded: false,
        error: "There is no such user",
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.redirect("/users/dashboard/");
    } else {
      res.status(401).json({
        succeded: false,
        error: "Paswords are not matched",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: "false",
      error,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getDashboard = async (req, res) => {
  const photos = await Photo.find({ user: res.locals.user._id });
  const user = await User.findById(res.locals.user._id).populate();
  res.render("dashboard", {
    link: "dashboard",
    user,
    photos,
  });
};

const getAllUsers = async (req, res) => {
  let users = await User.find({ _id: { $ne: res.locals.user._id } });

  res.render("users", {
    link: "users",
    users,
  });
};
const getAUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const photos = await Photo.find({ user: user._id });
    res.status(200).render("user", {
      user,
      photos,
      link: "users",
    });
  } catch (error) {
    res.send("<h1 style='color:red'>HATA</h1>" + error);
  }
};

export { createUser, loginUser, getDashboard, getAllUsers, getAUser };
