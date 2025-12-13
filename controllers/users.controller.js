const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  // extract data from the request
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({ message: "Name and email are required" });
    }

    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
