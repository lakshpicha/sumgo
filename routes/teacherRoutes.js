const express = require('express');
const router = express.Router();
const { createTeacher } = require('../controllers/teacherController');

// POST route to create a new teacher
router.post('/teachers', createTeacher);
router.get("/user-details", teacherController.getUserDetailsCurrent);
module.exports = router;
