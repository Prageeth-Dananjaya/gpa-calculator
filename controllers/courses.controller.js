const Courses = require("../models/course.model");

exports.getAllCourses = async (_, res) => {
  try {
    const courses = await Courses.find();

    if (!courses) {
      return res.status(404).json({ message: "Courses are unvailable" });
    }
    res.status(200).json(courses);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createCourse = async (req, res) => {
  const { courseCode, courseName } = req.body;

  try {
    const courses = await Courses.create({ courseCode, courseName });
    if (!courses) {
      return res.status(400).json({ message: "Course already exists" });
    }
    res.status(201).json(courses);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
