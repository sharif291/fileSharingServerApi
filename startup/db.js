const mongoose = require("mongoose");
// function to connect MongoDB Database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      keepAlive: 1,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`couldn't connected to MongoDB`, error);
  }
};

module.exports = connectDB;
