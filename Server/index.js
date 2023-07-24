const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Auth = require("./Routes/Auth");
const app = express();
require("dotenv").config();
var bodyParser = require("body-parser");


app.use(cors());
app.use(express.json());

try {
  mongoose.connect('mongodb+srv://admin:admin@covid-vaccine-booking.ygowip8.mongodb.net/?retryWrites=true&w=majority');
  console.log("DB Connection Successful");
} catch (error) {
  handleError(error);
}

app.use("/api/auth", Auth)

app.use(bodyParser.json());

const server = app.listen(5000, () =>
  console.log("Server started on 5000")
);
