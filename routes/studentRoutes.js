const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.get("/user-details", studentController.getUserDetailsCurrent);

router.get("/all", studentController.getStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;













































