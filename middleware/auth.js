const jwt = require("jsonwebtoken");

// Middleware to authenticate token
exports.isAuthenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
