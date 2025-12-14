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

// Find the user by Id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(400).json("Invalid user Id");
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "Users are unavailable" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
