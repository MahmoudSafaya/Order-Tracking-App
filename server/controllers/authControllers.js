const User = require('../models/User');
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name, email, password, role);
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and must be at least 6 characters long",
      });
    }
    // check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already taken",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      error: "User not found",
    });
  }

  // check if password is correct
  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.json({
      error: "Password is incorrect",
    });
  } else {
    // create signed token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: false, // Prevent JavaScript access
      secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
    //   sameSite: "strict", // CSRF protection
      maxAge: 1000 * 60 * 60 * 24,
      expiresIn: '1d'
    });
    return res.json({
      user: user,
      token: token,
    });
  }
};

const getProfile = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return res.json({user});
  } else {
    return res.json(null);
  }
};

module.exports = { registerUser, loginUser, getProfile };
