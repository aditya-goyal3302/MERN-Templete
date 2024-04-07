const jwt = require("jsonwebtoken");
exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
exports.createToken = async (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
};
