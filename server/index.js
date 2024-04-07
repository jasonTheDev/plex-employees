const express = require("express");
const cors = require("cors");
const pool = require("./data/db");
const app = express();
const employees = require("./data/employees.json");
const employeeRouter = require("./routes/employee.routes.js");

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

// add employees to db for demo purposes
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

app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use('/api/employees', employeeRouter);


createEmployeesTable().then(() => {
  truncateAndPopulateEmployeesTable().then(() => {
    app.listen(8080, () =>
      console.log("Job Dispatch API running: http://localhost:8080")
    );
  });
});
