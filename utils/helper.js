const crypto = require("crypto");

const helper = {};

// Helper function to generate random public key and private key for a file
helper.generateKeys = async () => {
  var publicKey = crypto.randomBytes(24).toString("hex");
  var privateKey = crypto.randomBytes(24).toString("hex");
  return { publicKey, privateKey };
};

module.exports = helper;
