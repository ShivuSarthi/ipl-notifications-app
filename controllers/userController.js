const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res
        .status(400)
        .send({ message: "Please provide username and password" });
    }
    const user = new User({ username, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.send({
      message: "User Register Successfully",
      data: user,
      token: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
