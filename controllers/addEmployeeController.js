const pool = require("../db");

const addEmployee = async (req, res) => {
  try {
    const {
      full_name,
      address,
      birth_date,
      phone_number,
      email,
      hire_date,
      job_title,
      password,
    } = req.body;

    const result = await pool.query(
      "INSERT INTO library.employee (full_name, address, birth_date, phone_number, email, hire_date, job_title, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        full_name,
        address,
        birth_date,
        phone_number,
        email,
        hire_date,
        job_title,
        password,
      ]
    );

    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addEmployee: addEmployee,
};
