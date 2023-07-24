const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    uname: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    });
  module.exports = mongoose.model("Admins", adminSchema);