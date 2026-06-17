const express = require("express");

const router = express.Router();

const studentController = require("../controllers/Student");

router.post("/", studentController.createStudent); 

module.exports = router;