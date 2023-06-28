require("./db/connect");
const express = require("express");
const app = express();
const multer = require("multer");
const cookieParser = require("cookie-parser");

// Require environment variables
require("dotenv").config();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use("/uploads", express.static("uploads"));

// Register routes
const itemRoutes = require("./routes/itemRoutes");
app.use("/api/v1", itemRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1", userRoutes);

const port = process.env.PORT || 3000;

// Secret key for JWT
const secretKey = process.env.SECRET_KEY;

// Start the server
const start = async () => {
  try {
    const connectDB = require("./db/connect");
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log("MongoDB connected");
      console.log(`Server is listening on port ${port}......`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

start();
