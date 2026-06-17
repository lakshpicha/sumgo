const express = require('express');
const router = express.Router();
const { createCourse } = require('../controllers/courseController');

// POST route to create a new course
router.post('/courses', createCourse);

module.exports = router;
