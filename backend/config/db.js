const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.URI);

    console.log(`MongoDB Connected ${connect.connection.host}`.blue.bold);
  } catch (error) {
    console.log(error.red);

    process.exit(1);
  }
};

module.exports = connectDB;
