const { pool } = require("../data/db");

const getEmployees = async (req, res) => {
  console.log("GET: /api/employees");

  const selectQuery = "SELECT * FROM employees";
  
  try {
    const result = await pool.query(selectQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createEmployee = async (req, res) => {
  console.log("POST: /api/employees", { body: req.body });

  const { name, code, profession, color, city, branch, assigned } = req.body;
  const queryParams = [name, code, profession, color, city, branch, assigned];
  const insertQuery = `
  INSERT INTO employees (
    name, code, profession, color, city, branch, assigned)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    
  try {
    const result = await pool.query(insertQuery, queryParams);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteEmployee = async (req, res) => {
  console.log("DELETE: /api/employees/:id");

  const { id } = req.params;
  const queryParams = [id];
  const deleteQuery = "DELETE FROM employees WHERE id = $1 RETURNING *";

  try {
    const result = await pool.query(deleteQuery, queryParams);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  deleteEmployee,
};
