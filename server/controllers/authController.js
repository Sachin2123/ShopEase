const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Login Backend API
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "Email and password are required" });
  }

  db.query(
    "SELECT id, name, email, password, role FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.json({ message: "User not found" });
      }

      const user = results[0];

      if (user.password !== password) {
        return res.json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, id: user.id },
        "secretkey",
        {
          expiresIn: "1h",
        }
      );
      console.log("Login successful for user:", user);
      res.json({ token, role: user.role, id: user.id });
    }
  );
};
