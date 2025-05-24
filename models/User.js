const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, default: "unknown" },
  referralCode: { type: String, required: true, unique: true },
  referredBy: { type: String, default: null },
  balance: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", userSchema);