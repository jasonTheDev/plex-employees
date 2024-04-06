const express = require("express");
const cors = require("cors");
const pool = require("./data/db");
const app = express();
const employees = require("./data/employees.json");

async function createEmployeesTable() {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        code VARCHAR(50),
        profession VARCHAR(255),
        color VARCHAR(50),
        city VARCHAR(255),
        branch VARCHAR(255),
        assigned BOOLEAN)`
    );
    console.log("Employees table created or already exists.");
  } catch (err) {
    console.error("Error creating employees table:", err.message);
    process.exit(1);
  }
}

// for demo purposes
async function truncateAndPopulateEmployeesTable() {
  try {
    // use 'RESTART IDENTITY' to keep id's consistent
    await pool.query("TRUNCATE TABLE employees RESTART IDENTITY");
    console.log("Table truncated successfully");
    for (const {
      name,
      code,
      profession,
      color,
      city,
      branch,
      assigned,
    } of employees) {
      pool.query(
        `INSERT INTO employees (
          name, code, profession, color, city, branch, assigned)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [name, code, profession, color, city, branch, assigned]
      );
    }
    console.log("Employees table populated successfully");
  } catch (err) {
    console.log("Error adding data to employees table: ", err.message);
    process.exit(1);
  }
}

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());

app.get("/api/employees", async (req, res) => {
  console.log("GET: /api/employees");
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  console.log("DELETE: /api/employees/:id");
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM employees WHERE id = $1 RETURNING *", [id]);

    // console.log(result);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.post("/api/employees", async (req, res) => {
  console.log("POST: /api/employees");
  try {
    const { name, code, profession, color, city, branch, assigned } = req.body;
    console.log(`Body: ${[name, code, profession, color, city, branch, assigned]}`);

    const result = await pool.query(
      `INSERT INTO employees (
        name, code, profession, color, city, branch, assigned)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, code, profession, color, city, branch, assigned]
    );
    
    //console.log(result)
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

createEmployeesTable().then(() => {
  truncateAndPopulateEmployeesTable().then(() => {
    app.listen(8080, () =>
      console.log("Job Dispatch API running: http://localhost:8080")
    );
  });
});
