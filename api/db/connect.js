const mongoose = require("mongoose");

const connectDB = (mongo_uri) => {
  if (!mongo_uri) {
    throw new Error("MongoDB connection URI is missing!");
  }

  return mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with a failure code
  });
};

module.exports = connectDB;
