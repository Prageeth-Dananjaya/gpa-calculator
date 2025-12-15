const express = require("express");
const router = express.Router();
const usersRoutes = require("./users.routes");
const coursesRoutes = require("./courses.routes");

router.use("/users", usersRoutes);
router.use("/courses", coursesRoutes);

module.exports = router;
