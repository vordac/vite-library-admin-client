const express = require("express");
const pool = require("../db");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
      }
      const result = await pool.query(
        "SELECT * FROM library.employee WHERE email = $1 AND password = $2",
        [email, password]
      );
      const user = result.rows[0];
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const jwtToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ jwtToken, user, job_title: user.job_title });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  signin: signin,
};
