const Result = require("../models/result.model");
const gradePoint = require("../utils/gradePoint");

exports.addCourseResult = async (req, res) => {
  try {
    const { courseId, grade, credits } = req.body;
    // Validate the grade
    const point = gradePoint(grade);
    if (point === undefined) {
      return res.status(400).json({ message: "Invalid grade" });
    }

    // Add the result of the course
    await Result.create({
      user: req.user.id,
      course: courseId,
      grade: grade,
      credits: credits,
    });

    const results = await Result.find({
      user: req.user.id,
    });

    let totalPoints = 0;
    let totalCredits = 0;

    results.forEach((r) => {
      totalPoints += gradePoint(r.grade) * r.credits;
      totalCredits += r.credits;
    });

    const gpa =
      totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);

    res.status(201).json({ message: "Course result added", gpa });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
