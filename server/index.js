const express = require("express");
const cors = require("cors");
const pool = require("./data/db");
const app = express();
const employees = require("./data/employees.json");

async function createOrTruncateDB() {
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
    console.log("Employee table created or already exists.");
    await pool.query("TRUNCATE TABLE employees");
  } catch (err) {
    console.error("Error creating employee table:", err.message);
    process.exit(1);
  }
}

async function addDataToDB() {
  try {
    for (const { name, code, profession, color, city, branch, assigned } of employees) {
      pool.query(`INSERT INTO employees (name, code, profession, color, city, branch, assigned) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [name, code, profession, color, city, branch, assigned])
    }
    console.log("Table populated")
  } catch (err) {
    console.log("Error adding data to table: ", err.message);
    process.exit(1);
  }
}

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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

app.delete("/api/employees/:id", (req, res) => {
  console.log("DELETE: /api/employees/:id");
  const { id } = req.params;
  const match = employees.find((emp) => emp.id === Number(id));
  if (typeof match === "undefined") {
    res.status(404).json({ message: "Employee not found" });
  }
  employees.filter((emp) => emp.id !== Number(id));
  res.status(200).json({ message: "Employee deleted successfully" });
});

app.post("/api/employees", (req, res) => {
  console.log("POST: /api/employees");
  const length = employees.length;
  var new_id = 1;
  if (length !== 0) {
    // get the id of the last employee and add 1 to that
    new_id = employees[length - 1].id + 1;
  }
  const new_employee = { id: new_id, ...req.body };
  employees.push(new_employee);
  res.status(200).json(new_employee);
});

createOrTruncateDB().then(() => {
  addDataToDB().then(() => {
    app.listen(8080, () => console.log("Job Dispatch API running: http://localhost:8080"));
  });
});
