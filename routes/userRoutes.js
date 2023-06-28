const express = require("express");
const router = express.Router();

const {
  signUpUser,
  signInUser,
  signOutUser,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/authenticateUser");

// Public routes
router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/signout", signOutUser);

// Protected route that requires authentication
router.get("/", authenticateUser, (req, res) => {
  // This code will only be executed if the user is authenticated
  res.json({ message: "Protected route accessed successfully" });
});

module.exports = router;
