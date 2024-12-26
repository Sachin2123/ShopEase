const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.json({ message: "Access denied" });

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
