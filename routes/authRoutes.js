
const express = require("express");

const router = express.Router();

const authController = require("../controllers/authcontrollers");
const protect=require("../middleware/authmiddleware");
router.use(protect);
router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

module.exports = router;

//backend ki coding learn kar re hai hum 

