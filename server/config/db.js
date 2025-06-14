const mongoose = require("mongoose");
require("dotenv").config();
const dbusername = process.env.DB_USERNAME;
const dbpassword = process.env.DB_PASSWORD;
const URI = `mongodb+srv://${dbusername}:${dbpassword}@priyanshucluster.fqaupta.mongodb.net/banking?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
