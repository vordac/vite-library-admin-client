const pool = require("../../db");

const getFormulars = async (req, res) => {
    const address = req.query.address;

    try {
        const result = await pool.query(
            "SELECT formulary_number, employee_full_name, book_isbn, loan_date, loan_days, return_date, reader_full_name, address FROM library.book_formulary WHERE address = $1",
            [address]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getFormulars: getFormulars,
};
