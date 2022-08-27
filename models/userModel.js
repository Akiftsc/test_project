import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username area is must to fill"],
      lowercase: true,
      validate: [validator.isAlphanumeric, "Only Alphanumeric characters"],
    },
    email: {
      type: String,
      required: [true, "Email area is must to fill"],
      unique: true,
      validate: [validator.isEmail, "Please put acceptable email"],
    },
    password: {
      type: String,
      required: [true, "Password area is must to fill"],
      minLenght: [6, "You must put least 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 12, (err, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

export default User;
