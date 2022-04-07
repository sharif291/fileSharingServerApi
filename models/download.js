const mongoose = require("mongoose");
// Schema to store download information of a file
const downloadSchema = new mongoose.Schema(
  {
    filePath: { type: String },
    ipAddress: { type: String },
  },
  { timestamps: true }
);
// Create and export the Downloads table
module.exports.Downloads = mongoose.model("Downloads", downloadSchema);
