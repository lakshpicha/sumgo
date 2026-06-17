const Student = require("../models/Student");
const User = require("../models/User");

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
                    from: "students",
                    localField: "_id",
                    foreignField: "userId",
                    as: "students"
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "userId",
                    as: "products"
                }
            },
            {
                $project: {
                    email: 1,
                    username: "$name",
                    students: 1,
                    products: 1
                }
            }
        ]);

        res.status(200).json(result[0] || {});
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Students
exports.getStudents = async (req, res) => {
    try {
        
        const students = await Student.find({ userId: req.user._id });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// exports.updateStudent = async (req, res) => {
//     try {
//         const student = await Student.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
// // console.log(student,"studentstudent")s
//         if (!student) {
//             return res.status(404).json({
//                 message: "Student not found"
//             });
//         }

//         res.status(200).json(student);
//     } catch (error) {
//        res.status(500).json({
//             message: error.message
//         });
//     }
// };
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};