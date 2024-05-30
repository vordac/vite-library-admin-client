const pool = require("../db");

const getEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT personal_id, full_name, address, birth_date, phone_number, email, hire_date, job_title FROM library.employee"
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getEmployees: getEmployees,
};
