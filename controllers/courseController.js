const Course = require('../models/Course');

const createCourse = async (req, res) => {
  try {
    const { courseName, duration, fees } = req.body;

    // Validation
    if (!courseName || !duration || fees === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: courseName, duration, fees',
      });
    }

    // Create new course
    const course = new Course({
      courseName,
      duration,
      fees,
    });

    const savedCourse = await course.save();

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: savedCourse,
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  createCourse,
};
