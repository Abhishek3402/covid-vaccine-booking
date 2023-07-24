const {
    login,
    register,
    adminLogin,
  } = require("../Controllers/userController");

const {
  addCentre,
  removeCentre,
  getAllCentres
} = require("../Controllers/centreController");

const {
  Centres,
  Dosage
} = require("../Controllers/bookingController");

const express = require('express')
  
  const router = express.Router();
  router.post("/login", login);
  router.post("/register", register);
  router.post("/adminLogin", adminLogin);
  router.post("/addCentre", addCentre);
  router.get("/getAllCentres", getAllCentres);
  router.post("/removeCentre", removeCentre);
  router.post("/Centres", Centres);
  router.get("/Dosage", Dosage)
  module.exports = router;