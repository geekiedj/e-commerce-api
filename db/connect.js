const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const mongoURI =
  "mongodb+srv://nenene:l6qJ2ZMc8FPpTvfZ@cluster0.mgctmsn.mongodb.net/?retryWrites=true&w=majority";
connectDB(mongoURI)
  .then(() => {
    // console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = connectDB;
