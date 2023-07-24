const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      max: 50,
    },
    cname: {
      type: String,
      required: true,
      max: 50,
    },
    date: {
      type: String,
      required: true,
    }
    });
  module.exports = mongoose.model("Bookings", bookingSchema);