const Teacher = require('../models/Teacher');

const createTeacher = async (req, res) => {
  try {
    const { name, subject, experience, email } = req.body;

    // Validation
    if (!name || !subject || experience === undefined || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, subject, experience, email',
      });
    }

    // Check if email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    // Create new teacher
    const teacher = new Teacher({
      name,
      subject,
      experience,
      email,
    });

    const savedTeacher = await teacher.save();

    return res.status(201).json({
      success: true,
      message: 'Teacher created successfully',
      data: savedTeacher,
    });
  } catch (error) {
    console.error('Error creating teacher:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  createTeacher,
};

exports.getUserDetailsCurrent = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $match: {
          _id: req.user._id
        }
      },
      {
        $lookup: {
          from: "student",
          localField: "_id",
          foreignField: "userId",
          as: "student"
        }
      },
      {
        $lookup: {
          from: "Product",
          localField: "_id",
          foreignField: "userId",
          as: "Product"
        }
      },
      {
        $project: {
            email:1,
            username:"$name",
            student:2,
            Product:2
        }
      }
]);

    res.status(200).json(result[0] || {});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}