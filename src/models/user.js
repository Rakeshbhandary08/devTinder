const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({

  firstName: { type: String ,
    index:true
  },

  lastName: { type: String },

  emailId: {
    type: String,
    required: true,
    lowercase: true,
    unique:true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    }
  },

  password: {
    type: String,
    required: true,
    validate(pass) {
      if (!validator.isStrongPassword(pass)) {
        throw new Error("Weak password");
      }
    }
  },

  age: {
    type: Number,
    min: 18,
    max: 60
  },

  gender: {
    type: String,
    lowercase: true,
    enum:{
      values:["male","female","other"],
      message:`{VALUE} is not a valid gender.`
    }
  },

  photoUrl: {
    type: String,
    validate(str) {
      if (!validator.isURL(str)) {
        throw new Error("Invalid URL");
      }
    }
  },

  about: { type: String },

  skills: { type: [String] }

}, { timestamps: true });


// SCHEMA METHODS FIRST

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id },
    "DevTinder@9298",
    { expiresIn: "24h" }
  );

  return token;
};


userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );

  return isPasswordValid;
};


// CREATE MODEL ONLY ONCE

const User = mongoose.model("User", userSchema);

module.exports = User;