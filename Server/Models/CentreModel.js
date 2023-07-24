const mongoose = require("mongoose");

const centreSchema = new mongoose.Schema(
    {
    cname: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    starttime: {
        type: String,
        required: true,
        min: 5,
        max: 5,
    },
    endtime: {
        type: String,
        required: true,
        min: 5,
        max: 5
    },
//{ typeKey: '$type' 
}
    );
  module.exports = mongoose.model("Centres", centreSchema);