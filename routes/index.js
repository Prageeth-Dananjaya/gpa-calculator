const express = require("express");
const router = express.Router();
const usersRoutes = require("./users.routes");
const coursesRoutes = require("./courses.routes");
const authRoutes = require("./auth.routes");

router.use("/users", usersRoutes);
router.use("/courses", coursesRoutes);
router.use("/auth", authRoutes);

module.exports = router;
