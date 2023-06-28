const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    // instead of Getting the token from the request header, we get it from cookies
    // const token = req.headers.authorization;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, "your-secret-key"); // Replace "your-secret-key" with your actual secret key

      // Attach the user information to the request object
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authenticateUser;
