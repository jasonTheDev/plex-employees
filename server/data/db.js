const { Pool } = require("pg");
const employees = require("./employees.json");

const pool = new Pool({
  host: "localhost",
  user: "plexxis-admin",
  database: "plexxis-db",
  password: "plexxis123",
  port: 5432,
});

async function createEmptyEmployeesTable() {
  const createQuery = `CREATE TABLE IF NOT EXISTS employees (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(255),
                       code VARCHAR(50),
                       profession VARCHAR(255),
                       color VARCHAR(50),
                       city VARCHAR(255),
                       branch VARCHAR(255),
                       assigned BOOLEAN)`;

  try {
    await pool.query(createQuery);
    console.log("Employees table created or already exists.");

    // use 'RESTART IDENTITY' to keep id's consistent
    await pool.query("TRUNCATE TABLE employees RESTART IDENTITY");
    console.log("Table truncated successfully");
  } catch (err) {
    console.error("Error creating employees table:", err.message);
    process.exit(1);
  }
}

// add employees to db for demo purposes
async function populateEmployeesTable() {
  const insertQuery = `INSERT INTO employees (name, code, profession, color, city, branch, assigned)
                       VALUES ($1, $2, $3, $4, $5, $6, $7)`;

  try {
    const promises = employees.map((employee) =>
      pool.query(insertQuery, [
        employee.name,
        employee.code,
        employee.profession,
        employee.color,
        employee.city,
        employee.branch,
        employee.assigned,
      ])
    );

    await Promise.all(promises);
    console.log("Employees table populated successfully");
  } catch (err) {
    console.error("Error adding data to employees table:", err.message);
    process.exit(1);
  }
}

async function createAndPopulateEmployeesTable() {
  await createEmptyEmployeesTable();
  await populateEmployeesTable();
}

module.exports = {
  pool,
  createAndPopulateEmployeesTable,
};
