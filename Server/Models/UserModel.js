const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20,
      },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    phoneno: {
        type: String,
        required: true,
        max: 10,
    },
    acard:{
        type: String,
        required: true,
        unique: true,
        max: 12,
    }
    });
  module.exports = mongoose.model("Users", userSchema);