const mongoose = require("mongoose");
// Schema to store file information
const fileSchema = new mongoose.Schema(
  {
    filePath: { type: String },
    publicKey: { type: String },
    privateKey: { type: String },
    lastActivity: { type: Date },
  },
  { timestamps: true }
);
// Create and export Files table
module.exports.Files = mongoose.model("Files", fileSchema);
