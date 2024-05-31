const pool = require("../../db");

const deleteEmployee = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      "DELETE FROM library.employee WHERE personal_id = $1",
      [id]
    );

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  deleteEmployee: deleteEmployee,
};
