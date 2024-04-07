const pool = require("../data/db");

const getEmployees = async (req, res) => {
  console.log("GET: /api/employees");
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
  console.log("POST: /api/employees");
  try {
    const { name, code, profession, color, city, branch, assigned } = req.body;
    console.log(
      `Body: ${[name, code, profession, color, city, branch, assigned]}`
    );

    const result = await pool.query(
      `INSERT INTO employees (
        name, code, profession, color, city, branch, assigned)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, code, profession, color, city, branch, assigned]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  console.log("DELETE: /api/employees/:id");

  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  deleteEmployee,
};
