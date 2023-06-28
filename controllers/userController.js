const User = require("../models/User");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

// Create user
const signUpUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// Sign in user
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user in db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Compare the provided password with the hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1h",
    });

    //set token as an http-only cookie
    res.cookie("token", token, { httpOnly: true });

    // Return the token as a response
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signOutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "sign out successful" });
};

module.exports = {
  signUpUser,
  signInUser,
  signOutUser,
};
