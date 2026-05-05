const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, // Helps with Admin-only tasks
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
