const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const resultsController = require("../controllers/results.controller");

router.post("/", auth, resultsController.addCourseResult);

module.exports = router;
