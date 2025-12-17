const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courses.controller");
const auth = require("../middleware/auth");

router.get("/", auth, coursesController.getAllCourses);
router.post("/", auth, coursesController.createCourse);

module.exports = router;
