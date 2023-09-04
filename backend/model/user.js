const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  middleName: {
    type: String,

  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,

  },

  email: {
    type: String,
  },
  password: {
    type: String,
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  newPassword: {
    type: String,
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: "user",
  },
  realquzeto: {
    type: String,
    default: '12'
  },
  freequzeto: {
    type: String,
    default: '3'
  },
  bonusquzeto: {
    type: String,
    default: '0'
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// comapre password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
